"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const certs = ["ECE R90", "ISO 9001", "IATF 16949"];

export default function Footer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <footer className="relative border-t border-line py-6 font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-2.5 px-6">
        <span>© 2026 PARSTECH — Fren Balata Sistemleri</span>
        <div className="flex flex-wrap items-center gap-1">
          {certs.map((c, i) => (
            <span key={c} className="flex items-center">
              {i > 0 && <span className="mx-1.5 text-line">·</span>}
              <motion.span
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                animate={{
                  color: hovered === i ? "#38BDF8" : hovered !== null ? "#5A6B80" : "#8A97A8",
                  scale: hovered === i ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="cursor-default"
              >
                {c}
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
