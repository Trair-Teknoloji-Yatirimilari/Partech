"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

function Field({
  id,
  label,
  type = "text",
  placeholder,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const floated = focused || value.length > 0;

  const inputCls =
    "peer w-full rounded-md border border-line bg-bg px-3.5 pb-3 pt-5 text-sm transition-colors focus:border-blue focus:outline-none";

  return (
    <div className="relative mb-5">
      <motion.label
        htmlFor={id}
        animate={{
          y: floated ? -22 : 0,
          scale: floated ? 0.85 : 1,
          color: focused ? "#38BDF8" : "#8A97A8",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="pointer-events-none absolute left-3.5 top-3.5 origin-left font-mono text-[11px] uppercase tracking-[0.14em]"
      >
        {label}
      </motion.label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          placeholder={floated ? placeholder : ""}
          className={inputCls}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={floated ? placeholder : ""}
          className={inputCls}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

function SuccessCheck() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M14 24 L21 31 L34 18"
        fill="none"
        stroke="#2D7FF9"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </motion.svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <SectionShell id="iletisim" className="section-py border-t border-line bg-panel">
      <div className="section-wrap">
        <SectionHead eyebrow="İletişim" title="Bayilik ve OEM teklifi alın." />
        <Reveal>
          <div className="mt-6 grid gap-10 sm:mt-9 sm:gap-12 md:grid-cols-2">
            <div>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start gap-4 py-8"
                  >
                    <SuccessCheck />
                    <p className="font-display text-lg font-semibold">
                      Talebiniz alındı.
                    </p>
                    <p className="text-sm text-muted">
                      Teknik ekibimiz 24 saat içinde dönüş yapacaktır.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0, y: -8 }}>
                    <Field id="cname" label="Ad / Firma" placeholder="Örn. Yılmaz Otomotiv" />
                    <Field id="cmail" label="E-posta" type="email" placeholder="ornek@firma.com" />
                    <Field id="cmsg" label="Mesaj" placeholder="İhtiyacınızı kısaca anlatın" textarea />
                    <motion.button
                      type="button"
                      onClick={() => setSent(true)}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="w-full rounded-md bg-blue px-6 py-3.5 font-mono text-sm font-medium text-white transition-colors hover:bg-cyan hover:text-bg sm:w-auto"
                    >
                      Gönder
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="mb-5 text-sm text-muted">
                Distribütörlük, filo anlaşmaları ve OEM eşleştirme talepleriniz
                için teknik ekibimiz 24 saat içinde dönüş yapar.
              </p>
              <div className="space-y-3 font-mono text-[13px]">
                <div className="flex flex-col gap-0.5 sm:flex-row">
                  <span className="shrink-0 text-muted sm:w-[70px]">TEL</span>
                  <span>+90 (212) 000 00 00</span>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row">
                  <span className="shrink-0 text-muted sm:w-[70px]">E-POSTA</span>
                  <span className="break-all">info@parstech.com.tr</span>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row">
                  <span className="shrink-0 text-muted sm:w-[70px]">ADRES</span>
                  <span>OSB Mah. Sanayi Cad. No:1, İstanbul</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
