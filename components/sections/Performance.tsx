"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

const rows = [
  {
    title: "Durma Mesafesi (100→0 km/s, kuru)",
    val: "36 m · −%14",
    pars: 72,
    std: 84,
    stdLabel: "SEGMENT ORT. — 42 m",
  },
  {
    title: "Isı Direnci (fading başlangıcı)",
    val: "650 °C · +%44",
    pars: 93,
    std: 64,
    stdLabel: "SEGMENT ORT. — 450 °C",
  },
  {
    title: "Servis Ömrü (karma kullanım)",
    val: "60.000 km · +%50",
    pars: 90,
    std: 60,
    stdLabel: "SEGMENT ORT. — 40.000 km",
  },
];

function Bar({
  width,
  variant,
  inView,
  delay,
}: {
  width: number;
  variant: "pars" | "std";
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="relative h-3.5 overflow-hidden rounded bg-steel">
      <motion.i
        className="absolute inset-y-0 left-0 block rounded"
        style={{
          background:
            variant === "pars"
              ? "linear-gradient(90deg,#2D7FF9,#38BDF8)"
              : "#3A4656",
          boxShadow: variant === "pars" && inView ? "0 0 12px rgba(45,127,249,0.35)" : "none",
        }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${width}%` : 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
      />
    </div>
  );
}

export default function Performance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionShell id="performans" className="section-py">
      <div className="section-wrap">
        <SectionHead
          eyebrow="Test Verileri"
          title="Rakamlar, pazarlama değildir."
          lead="Bağımsız test protokollerine göre, segment ortalaması (standart organik balata) ile karşılaştırma."
        />
        <Reveal>
          <div ref={ref} className="flex max-w-3xl flex-col gap-9">
            {rows.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 22,
                  delay: i * 0.15,
                }}
              >
                <div className="mb-2.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="font-display text-sm font-semibold leading-snug sm:text-base">{r.title}</h4>
                  <motion.span
                    className="shrink-0 font-mono text-xs text-cyan sm:text-[13px]"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.9 }}
                  >
                    {r.val}
                  </motion.span>
                </div>
                <div className="mb-1 font-mono text-[11px] tracking-[0.1em] text-muted">
                  PARSTECH
                </div>
                <Bar width={r.pars} variant="pars" inView={inView} delay={i * 0.15 + 0.1} />
                <div className="mb-1 mt-2 font-mono text-[11px] tracking-[0.1em] text-muted">
                  {r.stdLabel}
                </div>
                <Bar width={r.std} variant="std" inView={inView} delay={i * 0.15 + 0.35} />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
