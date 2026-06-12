"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { href: "#katman", label: "Katman Teknolojisi", id: "katman" },
  { href: "#isi", label: "Isı Yönetimi", id: "isi" },
  { href: "#sistem", label: "Sistem", id: "sistem" },
  { href: "#performans", label: "Performans", id: "performans" },
];

export default function Navbar() {
  const active = useActiveSection();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.82, 0.95]);

  useEffect(() => {
    if (reduced) return;
    return scrollY.on("change", (y) => {
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
      lastY.current = y;
    });
  }, [scrollY, reduced]);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md"
      style={{ backgroundColor: reduced ? "rgba(11,15,20,0.82)" : undefined }}
      animate={{ y: hidden && !reduced ? -72 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      {!reduced && (
        <motion.div
          className="absolute inset-0 -z-10 bg-bg"
          style={{ opacity: bgOpacity }}
          aria-hidden
        />
      )}
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <motion.a
          href="#top"
          className="font-display text-xl font-bold tracking-wide"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          PARS<span className="text-blue">TECH</span>
        </motion.a>
        <div className="flex items-center gap-7 text-sm">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative hidden transition-colors md:block ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-cyan"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                )}
              </a>
            );
          })}
          <motion.a
            href="#iletisim"
            className="rounded bg-blue px-4 py-2 font-mono text-[13px] font-medium text-white transition-colors hover:bg-cyan hover:text-bg"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            Teklif Al
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
