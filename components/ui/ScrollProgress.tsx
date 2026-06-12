"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-blue to-cyan"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
