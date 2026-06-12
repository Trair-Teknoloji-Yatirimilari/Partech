"use client";

import { useReducedMotion } from "framer-motion";

export default function BackgroundGrid() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#243040 1px, transparent 1px),
            linear-gradient(90deg, #243040 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="animate-grid-drift absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(#38BDF8 1px, transparent 1px),
          linear-gradient(90deg, #38BDF8 1px, transparent 1px)
        `,
        backgroundSize: "96px 96px",
      }} />
    </div>
  );
}
