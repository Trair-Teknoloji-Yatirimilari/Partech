"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type ScrollTarget = string | number | HTMLElement;

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: { offset?: number; duration?: number }) => {
      const offset = options?.offset ?? -80;
      const duration = options?.duration ?? 1.2;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset, duration });
        return;
      }

      if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = instance;
    setLenis(instance);

    let rafId: number;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const offset = window.innerWidth < 768 ? -56 : -80;
      instance.scrollTo(el as HTMLElement, { offset, duration: 1.2 });
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleClick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
