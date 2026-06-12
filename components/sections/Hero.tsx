"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: -26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

function SpecCounter({
  value,
  suffix,
  prefix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const count = useCountUp(value, 1400, decimals, inView);

  return (
    <div ref={ref}>
      <b className="block font-display text-xl font-semibold sm:text-2xl">
        {prefix}
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        {suffix}
      </b>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.88]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.4]);

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 md:pt-36"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          scale: glowScale,
          background:
            "radial-gradient(ellipse 60% 50% at 75% 40%, rgba(45,127,249,.12), transparent 70%)",
        }}
      />
      <div className="section-wrap grid w-full items-center gap-8 sm:gap-12 md:grid-cols-[1.05fr_.95fr]">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          variants={container}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <motion.div variants={item} className="eyebrow">
            Fren Balata Sistemleri
          </motion.div>
          <motion.h1
            variants={item}
            className="mb-5 font-display text-[clamp(2rem,8vw,3.875rem)] font-bold leading-[1.08]"
          >
            Duruş gücü,
            <br />
            <span className="text-blue">mühendislikle</span> ölçülür.
          </motion.h1>
          <motion.p variants={item} className="mb-7 max-w-md text-base text-muted sm:mb-9 sm:text-[17px]">
            Parstech balataları; yüksek ısı direnci, sessiz çalışma ve tutarlı
            sürtünme katsayısı için katman katman tasarlanır. Yolda değil,
            laboratuvarda kanıtlanır.
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <motion.a
              href="#sistem"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="rounded-md bg-blue px-6 py-3.5 text-center font-mono text-sm font-medium text-white transition-colors hover:bg-cyan hover:text-bg"
            >
              Sistemi İncele
            </motion.a>
            <motion.a
              href="#iletisim"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="rounded-md border border-line px-6 py-3.5 text-center font-mono text-sm transition-colors hover:border-blue"
            >
              Bayilik &amp; Teklif
            </motion.a>
          </motion.div>
          <motion.div variants={item} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-12 sm:flex sm:flex-wrap sm:gap-8">
            <SpecCounter value={650} suffix="°C" label="Isı Direnci" />
            <SpecCounter value={0.42} prefix="μ " label="Sürtünme Katsayısı" decimals={2} />
            <div className="col-span-2 sm:col-span-1">
              <b className="block font-display text-2xl font-semibold">ECE R90</b>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Sertifikasyon
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY, scale: visualScale }}
          initial={reduced ? false : { opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.35 }}
          className="flex justify-center px-2 sm:px-0"
        >
          <BrakeDisc reduced={!!reduced} />
        </motion.div>
      </div>
    </header>
  );
}

function BrakeDisc({ reduced }: { reduced: boolean }) {
  return (
    <svg
      width="100%"
      viewBox="0 0 520 520"
      className="max-w-[min(100%,280px)] sm:max-w-[440px]"
      role="img"
      aria-label="Parstech fren diski ve kaliper çizimi"
    >
      <defs>
        <radialGradient id="discFace" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2A3442" />
          <stop offset="70%" stopColor="#1B232E" />
          <stop offset="100%" stopColor="#131A22" />
        </radialGradient>
        <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D7FF9" />
          <stop offset="100%" stopColor="#1D5FC4" />
        </linearGradient>
      </defs>
      <motion.g
        style={{ originX: "260px", originY: "260px" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        <circle cx="260" cy="260" r="200" fill="url(#discFace)" stroke="#2B3848" strokeWidth="2" />
        <circle cx="260" cy="260" r="150" fill="none" stroke="#2B3848" strokeWidth="1.5" strokeDasharray="4 8" />
        <g fill="#0B0F14">
          <circle cx="260" cy="85" r="7" /><circle cx="412" cy="172" r="7" />
          <circle cx="412" cy="348" r="7" /><circle cx="260" cy="435" r="7" />
          <circle cx="108" cy="348" r="7" /><circle cx="108" cy="172" r="7" />
        </g>
        <g stroke="#0E141B" strokeWidth="3">
          <line x1="260" y1="130" x2="260" y2="190" /><line x1="372" y1="195" x2="322" y2="225" />
          <line x1="372" y1="325" x2="322" y2="295" /><line x1="260" y1="390" x2="260" y2="330" />
          <line x1="148" y1="325" x2="198" y2="295" /><line x1="148" y1="195" x2="198" y2="225" />
        </g>
        <circle cx="260" cy="260" r="70" fill="#10161E" stroke="#2B3848" strokeWidth="2" />
        <circle cx="260" cy="260" r="16" fill="#2D7FF9" />
      </motion.g>
      <g>
        <path
          d="M150 60 A 215 215 0 0 1 370 60 L 352 118 A 158 158 0 0 0 168 118 Z"
          fill="url(#calGrad)"
          stroke="#1A4D9E"
          strokeWidth="2"
        />
        <text
          x="260" y="92" textAnchor="middle"
          fontFamily="var(--font-display)" fontWeight="700" fontSize="22"
          fill="#fff" letterSpacing="2"
        >
          PARSTECH
        </text>
      </g>
    </svg>
  );
}
