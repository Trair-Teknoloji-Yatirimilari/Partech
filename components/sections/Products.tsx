"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

type Category = "tumu" | "binek" | "ticari" | "filo";

const filters: { id: Category; label: string }[] = [
  { id: "tumu", label: "Tümü" },
  { id: "binek", label: "Binek" },
  { id: "ticari", label: "Ticari" },
  { id: "filo", label: "Filo / OEM" },
];

const products = [
  {
    id: "pt-9000",
    series: "PT-9000",
    name: "Ceramix Pro",
    category: "binek" as const,
    desc: "Seramik takviyeli premium formül; yüksek hızda stabil μ, minimum toz ve sessiz NVH profili.",
    temp: "650°C",
    friction: "μ 0.42",
    life: "55.000 km",
    cert: "ECE R90",
    accent: "#38BDF8",
  },
  {
    id: "pt-7000",
    series: "PT-7000",
    name: "HeavyDuty Max",
    category: "ticari" as const,
    desc: "Ağır hizmet ve kamyonet segmenti; yüksek termal yük altında fading direnci ve uzun servis aralığı.",
    temp: "680°C",
    friction: "μ 0.44",
    life: "80.000 km",
    cert: "ECE R90",
    accent: "#2D7FF9",
  },
  {
    id: "pt-5000",
    series: "PT-5000",
    name: "UrbanLine",
    category: "binek" as const,
    desc: "Günlük şehir içi kullanım; dengeli duruş mesafesi, düşük disk aşınması, ekonomik servis maliyeti.",
    temp: "580°C",
    friction: "μ 0.40",
    life: "45.000 km",
    cert: "ECE R90",
    accent: "#7C9CC4",
  },
  {
    id: "pt-3000",
    series: "PT-3000",
    name: "Fleet OEM",
    category: "filo" as const,
    desc: "Filo ve OEM eşleştirme serisi; standart tolerans bandı, toplu tedarik ve teknik datasheet desteği.",
    temp: "620°C",
    friction: "μ 0.41",
    life: "60.000 km",
    cert: "IATF 16949",
    accent: "#2D7FF9",
  },
  {
    id: "pt-8000",
    series: "PT-8000",
    name: "Transit HD",
    category: "ticari" as const,
    desc: "Minibüs, panelvan ve hafif ticari araçlar; ıslak zemin performansı ve yüksek döngü dayanımı.",
    temp: "640°C",
    friction: "μ 0.43",
    life: "70.000 km",
    cert: "ECE R90",
    accent: "#38BDF8",
  },
  {
    id: "pt-2000",
    series: "PT-2000",
    name: "OEM Custom",
    category: "filo" as const,
    desc: "Özel kalıp ve araç platformu eşleştirmesi; proje bazlı formülasyon ve saha test protokolü.",
    temp: "Proje bazlı",
    friction: "Özel μ",
    life: "Spec'e göre",
    cert: "ISO 9001",
    accent: "#5A6B80",
  },
];

export default function Products() {
  const [filter, setFilter] = useState<Category>("tumu");

  const visible =
    filter === "tumu"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <SectionShell id="urunler" className="section-py border-b border-line bg-panel">
      <div className="section-wrap">
        <SectionHead
          eyebrow="Ürün Portföyü"
          title="Segment bazlı fren balata serileri."
          lead="Binek, ticari ve filo/OEM uygulamaları için formüle edilmiş Parstech serileri. Tüm ürünler katman teknolojisi ve bağımsız test protokolleriyle doğrulanır."
        />

        <Reveal>
          <LayoutGroup>
            <div className="mb-8 flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      active
                        ? "border-blue text-ink"
                        : "border-line text-muted hover:border-blue/50 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="product-filter"
                        className="absolute inset-0 rounded-md bg-blue/10"
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  delay: i * 0.05,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-lg border border-line bg-bg p-5 transition-colors hover:border-[var(--accent)] hover:bg-steel sm:p-6"
                style={{ "--accent": p.accent } as React.CSSProperties}
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-80"
                  style={{ background: p.accent }}
                />
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                      {p.series}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold">{p.name}</h3>
                  </div>
                  <span
                    className="shrink-0 rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {p.category === "binek"
                      ? "Binek"
                      : p.category === "ticari"
                        ? "Ticari"
                        : "Filo"}
                  </span>
                </div>
                <p className="mb-4 text-[13.5px] leading-relaxed text-muted">{p.desc}</p>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-line pt-4 font-mono text-[11px]">
                  <div>
                    <dt className="text-muted">Isı limiti</dt>
                    <dd className="mt-0.5 text-ink">{p.temp}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Sürtünme</dt>
                    <dd className="mt-0.5 text-ink">{p.friction}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Servis ömrü</dt>
                    <dd className="mt-0.5 text-ink">{p.life}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Sertifika</dt>
                    <dd className="mt-0.5 text-cyan">{p.cert}</dd>
                  </div>
                </dl>
                <motion.a
                  href="#iletisim"
                  whileHover={{ x: 4 }}
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-blue transition-colors hover:text-cyan"
                >
                  Teklif al →
                </motion.a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionShell>
  );
}
