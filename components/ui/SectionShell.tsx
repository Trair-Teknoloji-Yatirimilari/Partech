"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SectionShell({
  id,
  children,
  className = "",
  shimmer = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  shimmer?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {shimmer && !reduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heat/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      )}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-cyan/60 via-blue/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          aria-hidden
        />
      )}
      {children}
    </section>
  );
}
