"use client";

import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "top", label: "Hero" },
  { id: "katman", label: "Katman" },
  { id: "isi", label: "Isı" },
  { id: "sistem", label: "Sistem" },
  { id: "performans", label: "Performans" },
  { id: "iletisim", label: "İletişim" },
] as const;

export function useActiveSection() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
