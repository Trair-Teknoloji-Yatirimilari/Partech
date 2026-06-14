"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SECTIONS, useActiveSection } from "@/hooks/useActiveSection";

const mobileLabels: Record<string, string> = {
  top: "Ana",
  urunler: "Ürün",
  katman: "Katman",
  isi: "Isı",
  sistem: "Sistem",
  performans: "Test",
  iletisim: "Teklif",
};

export default function MobileBottomNav() {
  const active = useActiveSection();
  const reduced = useReducedMotion();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobil bölüm navigasyonu"
    >
      <div className="flex items-stretch justify-around px-1 py-2">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1.5"
              aria-current={isActive ? "true" : undefined}
            >
              {!reduced && isActive && (
                <motion.span
                  layoutId="mobile-nav-dot"
                  className="absolute -top-2 h-0.5 w-6 rounded-full bg-cyan"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              )}
              <span
                className={`font-mono text-[9px] font-medium uppercase tracking-wide sm:text-[10px] ${
                  isActive ? "text-cyan" : "text-muted"
                }`}
              >
                {mobileLabels[s.id] ?? s.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
