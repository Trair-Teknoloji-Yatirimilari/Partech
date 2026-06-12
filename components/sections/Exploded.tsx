"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

const labels = [
  { color: "#9FB2C8", text: "Havalandırmalı disk" },
  { color: "#2D7FF9", text: "İç balata (K-01→K-04)" },
  { color: "#38BDF8", text: "Dış balata" },
  { color: "#5A6B80", text: "Tek pistonlu kaliper" },
];

const GUIDE_PATH =
  "M 120 280 L 380 280 M 380 280 L 380 240 M 380 240 L 520 240";

export default function Exploded() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [manual, setManual] = useState<boolean | null>(null);
  const [scrollOpen, setScrollOpen] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    if (manual === null) setScrollOpen(v);
  });

  const targetOpen = manual !== null ? (manual ? 1 : 0) : scrollOpen;
  const openMotion = useMotionValue(0);
  const openSpring = useSpring(openMotion, { stiffness: 70, damping: 16 });

  useEffect(() => {
    openMotion.set(targetOpen);
  }, [targetOpen, openMotion]);

  const discX = useTransform(openSpring, (v) => v * -130);
  const padOutX = useTransform(openSpring, (v) => v * 70);
  const padInX = useTransform(openSpring, (v) => v * -30);
  const caliperX = useTransform(openSpring, (v) => v * 170);
  const strokeOffset = useTransform(openSpring, (v) => (1 - v) * 400);
  const labelOpacity = useTransform(openSpring, [0.4, 0.7], [0, 1]);

  const handleToggle = () => {
    setManual((m) => {
      if (m === null) return scrollOpen > 0.5 ? false : true;
      return !m;
    });
  };

  return (
    <SectionShell id="sistem" className="py-28">
      <div ref={containerRef} className="mx-auto max-w-[1100px] px-6">
        <SectionHead
          eyebrow="Sistem Mimarisi"
          title="Patlatılmış görünüm."
          lead="Disk, iç/dış balata ve kaliper — her parça tek bir tolerans hedefine göre eşleştirilir. Kaydırarak veya butonla sistemi açın."
        />
        <Reveal>
          <div className="relative flex min-h-[480px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-line bg-panel px-5 pb-7 pt-10 md:min-h-[520px]">
            <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.16em] text-muted">
              PT-EX/01 — MONTAJ ŞEMASI
            </span>
            <svg
              width="100%"
              viewBox="0 0 760 340"
              className="max-w-[760px]"
              role="img"
              aria-label="Fren sistemi patlatılmış görünüm"
            >
              {!reduced && (
                <motion.path
                  d={GUIDE_PATH}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray="400"
                  style={{ strokeDashoffset: strokeOffset }}
                  opacity={0.35}
                />
              )}
              <motion.g style={{ x: reduced ? 0 : discX }}>
                <ellipse cx="330" cy="170" rx="36" ry="130" fill="#222D3B" stroke="#3A4656" strokeWidth="2" />
                <ellipse cx="322" cy="170" rx="36" ry="130" fill="#1B232E" stroke="#3A4656" strokeWidth="2" />
                <ellipse cx="322" cy="170" rx="14" ry="52" fill="#10161E" stroke="#3A4656" strokeWidth="1.5" />
              </motion.g>
              <motion.g style={{ x: reduced ? 0 : padOutX }}>
                <rect x="238" y="92" width="9" height="156" rx="3" fill="#5A6B80" />
                <rect x="247" y="92" width="20" height="156" rx="4" fill="#38BDF8" />
              </motion.g>
              <motion.g style={{ x: reduced ? 0 : padInX }}>
                <rect x="385" y="92" width="20" height="156" rx="4" fill="#2D7FF9" />
                <rect x="405" y="92" width="9" height="156" rx="3" fill="#5A6B80" />
              </motion.g>
              <motion.g style={{ x: reduced ? 0 : caliperX }}>
                <path
                  d="M430 70 h70 q26 0 26 26 v148 q0 26 -26 26 h-70 v-34 h56 q8 0 8 -8 v-116 q0 -8 -8 -8 h-56 Z"
                  fill="#2A3442"
                  stroke="#3A4656"
                  strokeWidth="2"
                />
                <rect x="436" y="148" width="34" height="44" rx="5" fill="#10161E" stroke="#3A4656" strokeWidth="1.5" />
                <text
                  x="492" y="178" textAnchor="middle"
                  fontFamily="var(--font-display)" fontSize="13" fontWeight="700"
                  fill="#8A97A8" transform="rotate(-90 492 178)" letterSpacing="2"
                >
                  PARSTECH
                </text>
              </motion.g>
            </svg>
            <motion.div
              style={{ opacity: reduced ? 1 : labelOpacity }}
              className="flex flex-wrap justify-center gap-6 font-mono text-xs text-muted"
            >
              {labels.map((l) => (
                <span key={l.text} className="flex items-center gap-2">
                  <i
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: l.color }}
                  />
                  {l.text}
                </span>
              ))}
            </motion.div>
            <motion.button
              type="button"
              onClick={handleToggle}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="mt-4 rounded border border-line px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-blue"
            >
              Görünümü Aç / Kapat
            </motion.button>
          </div>
        </Reveal>
        {!reduced && (
          <p className="mt-4 text-center font-mono text-[11px] tracking-wider text-muted">
            Scroll ile parçalar ayrılır
          </p>
        )}
      </div>
    </SectionShell>
  );
}
