"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

export default function HeatSim() {
  const reduced = useReducedMotion();
  const [heat, setHeat] = useState(0);
  const [brakingActive, setBrakingActive] = useState(false);
  const braking = useRef(false);
  const rafRef = useRef<number | null>(null);

  const heatMotion = useMotionValue(0);
  const heatSpring = useSpring(heatMotion, { stiffness: 120, damping: 22 });

  useEffect(() => {
    heatMotion.set(heat);
  }, [heat, heatMotion]);
  const displayTemp = useTransform(heatSpring, (h) => Math.round(38 + h * 612));
  const [temp, setTemp] = useState(38);

  useEffect(() => {
    return displayTemp.on("change", (v) => setTemp(Math.round(v)));
  }, [displayTemp]);

  const loop = useCallback(() => {
    setHeat((h) => {
      const next = Math.max(0, Math.min(1, h + (braking.current ? 0.012 : -0.006)));
      if (braking.current || next > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
      return next;
    });
  }, []);

  const start = useCallback(() => {
    braking.current = true;
    setBrakingActive(true);
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    braking.current = false;
    setBrakingActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [stop]);

  const note =
    temp > 600
      ? { text: "Limit bölgesi · Parstech μ hâlâ stabil", color: "#F43F5E" }
      : temp > 300
        ? { text: "Yüksek yük · μ 0.42 korunuyor", color: "#FACC15" }
        : {
            text: brakingActive ? "Isınıyor…" : "Sistem soğuk · μ stabil",
            color: "#8A97A8",
          };

  return (
    <SectionShell id="isi" className="border-y border-line bg-panel py-28" shimmer>
      <div className="mx-auto grid max-w-[1100px] items-center gap-14 px-6 md:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Isı Yönetimi"
            title="Frenleme anını canlı izleyin."
            lead="Frenleme sırasında kinetik enerji ısıya dönüşür. Parstech formülasyonu 650°C'ye kadar sürtünme katsayısını korur ve fading (fren zayıflaması) etkisini geciktirir."
          />
          <Reveal>
            <p className="text-sm text-muted">
              Butona <b className="text-ink">basılı tutun</b> — disk ısınsın.
              Bırakın — havalandırma kanalları soğutsun.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={
                brakingActive && !reduced
                  ? { x: [0, -1.5, 1.5, -1, 1, 0], y: [0, 0.5, -0.5, 0] }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.12, repeat: brakingActive ? Infinity : 0 }}
            >
              <svg
                width="100%"
                viewBox="0 0 320 320"
                className="max-w-[300px]"
                role="img"
                aria-label="Isı simülasyonu diski"
              >
                <defs>
                  <radialGradient id="coldG" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#1E2936" />
                    <stop offset="100%" stopColor="#141B24" />
                  </radialGradient>
                  <radialGradient id="hotG" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="45%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#7F1D3A" />
                  </radialGradient>
                </defs>
                <circle cx="160" cy="160" r="130" fill="url(#coldG)" stroke="#2B3848" strokeWidth="2" />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="130"
                  fill="url(#hotG)"
                  animate={{ opacity: heat * 0.92 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.circle
                  cx="160"
                  cy="160"
                  r="130"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2"
                  animate={{ opacity: heat > 0.3 ? heat * 0.4 : 0 }}
                />
                <circle cx="160" cy="160" r="92" fill="none" stroke="#0B0F14" strokeWidth="1.5" strokeDasharray="3 7" />
                <circle cx="160" cy="160" r="44" fill="#10161E" stroke="#2B3848" strokeWidth="2" />
                <circle cx="160" cy="160" r="10" fill="#2D7FF9" />
                {/* Kaliper pads closing on brake */}
                <motion.rect
                  x="118"
                  y="92"
                  width="12"
                  height="136"
                  rx="3"
                  fill="#2D7FF9"
                  animate={{ x: brakingActive ? 126 : 118 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                />
                <motion.rect
                  x="190"
                  y="92"
                  width="12"
                  height="136"
                  rx="3"
                  fill="#2D7FF9"
                  animate={{ x: brakingActive ? 182 : 190 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                />
              </svg>
            </motion.div>
            <div className="flex items-center gap-5 font-mono text-[15px] text-muted">
              <motion.b
                key={temp}
                initial={{ opacity: 0.6, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-medium text-ink"
              >
                {temp}
              </motion.b>
              <span>°C / yüzey sıcaklığı</span>
            </div>
            <motion.button
              type="button"
              aria-label="Fren simülasyonu: basılı tutun"
              onPointerDown={(e) => {
                e.preventDefault();
                start();
              }}
              onPointerLeave={stop}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") start();
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") stop();
              }}
              animate={
                brakingActive
                  ? { scale: 0.97, backgroundColor: "#F43F5E", borderColor: "#F43F5E", color: "#fff" }
                  : { scale: 1, backgroundColor: "#1B232E", borderColor: "#243040", color: "#E8EDF4" }
              }
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="select-none touch-none rounded-md border px-8 py-4 font-mono text-sm font-medium tracking-wide"
            >
              ▼ FRENİ UYGULA
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.span
                key={note.text}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-xs"
                style={{ color: note.color }}
              >
                {note.text}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
