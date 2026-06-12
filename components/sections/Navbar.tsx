"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { href: "#katman", label: "Katman Teknolojisi", id: "katman" },
  { href: "#isi", label: "Isı Yönetimi", id: "isi" },
  { href: "#sistem", label: "Sistem", id: "sistem" },
  { href: "#performans", label: "Performans", id: "performans" },
  { href: "#iletisim", label: "İletişim", id: "iletisim" },
];

export default function Navbar() {
  const active = useActiveSection();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.82, 0.95]);

  useEffect(() => {
    if (reduced) return;
    return scrollY.on("change", (y) => {
      const delta = y - lastY.current;
      if (menuOpen) {
        setHidden(false);
      } else if (y < 80) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }
      lastY.current = y;
    });
  }, [scrollY, reduced, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md"
        style={{
          backgroundColor: reduced ? "rgba(11,15,20,0.92)" : undefined,
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
        animate={{ y: hidden && !reduced && !menuOpen ? -80 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {!reduced && (
          <motion.div
            className="absolute inset-0 -z-10 bg-bg"
            style={{ opacity: bgOpacity }}
            aria-hidden
          />
        )}
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <motion.a
            href="#top"
            className="font-display text-lg font-bold tracking-wide sm:text-xl"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            onClick={closeMenu}
          >
            PARS<span className="text-blue">TECH</span>
          </motion.a>

          <div className="flex items-center gap-3 sm:gap-7">
            <div className="hidden items-center gap-7 text-sm md:flex">
              {links.slice(0, 4).map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`relative transition-colors ${
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
            </div>

            <motion.a
              href="#iletisim"
              className="hidden rounded bg-blue px-4 py-2 font-mono text-[13px] font-medium text-white transition-colors hover:bg-cyan hover:text-bg sm:inline-block"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              Teklif Al
            </motion.a>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
              aria-label="Menüyü kapat"
              onClick={closeMenu}
            />
            <motion.div
              className="absolute inset-x-0 top-0 border-b border-line bg-panel px-4 pb-6 pt-[calc(3.5rem+env(safe-area-inset-top))] sm:px-6"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => {
                  const isActive = active === l.id;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={closeMenu}
                      className={`rounded-md px-3 py-3 font-mono text-sm transition-colors ${
                        isActive
                          ? "bg-steel text-cyan"
                          : "text-muted hover:bg-steel hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </a>
                  );
                })}
                <a
                  href="#iletisim"
                  onClick={closeMenu}
                  className="mt-2 rounded-md bg-blue px-3 py-3 text-center font-mono text-sm font-medium text-white"
                >
                  Teklif Al
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
