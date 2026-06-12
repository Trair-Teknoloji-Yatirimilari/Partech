"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SECTIONS, useActiveSection } from "@/hooks/useActiveSection";

export default function SectionNav() {
  const active = useActiveSection();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <nav
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Bölüm navigasyonu"
    >
      {SECTIONS.map((s, i) => {
        const isActive = s.id === active;
        return (
          <div key={s.id} className="flex items-center justify-end gap-2">
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 6 }}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
            >
              {s.label}
            </motion.span>
            <motion.a
              href={`#${s.id}`}
              className="pointer-events-auto font-mono text-[11px] tracking-wider"
              animate={{
                color: isActive ? "#38BDF8" : "#8A97A8",
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              aria-current={isActive ? "true" : undefined}
              aria-label={s.label}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.a>
          </div>
        );
      })}
    </nav>
  );
}
