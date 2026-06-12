"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import SectionShell from "@/components/ui/SectionShell";

const layers = [
  {
    num: "K-01",
    title: "Sürtünme Yüzeyi",
    desc: "Seramik takviyeli organik karışım; ıslak ve kuru zeminde tutarlı μ değeri, minimum disk aşınması.",
    tag: "Seramik kompozit",
    color: "#38BDF8",
  },
  {
    num: "K-02",
    title: "Geçiş Tabakası",
    desc: "Sürtünme yüzeyini taşıyıcıya kademeli bağlar; ani frenlemede katman ayrılmasını engeller.",
    tag: "Termoset bağ",
    color: "#2D7FF9",
  },
  {
    num: "K-03",
    title: "İzolasyon Tabakası",
    desc: "Isının kalipere ve hidrolik sisteme geçişini sınırlar; fren hissini sıcakta bile korur.",
    tag: "Termal bariyer",
    color: "#7C9CC4",
  },
  {
    num: "K-04",
    title: "Çelik Taşıyıcı + Shim",
    desc: "Hassas işlenmiş çelik plaka ve titreşim sönümleyici shim; gıcırtısız, sessiz çalışma.",
    tag: "NVH kontrolü",
    color: "#5A6B80",
  },
];

export default function Layers() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SectionShell id="katman" className="section-py">
      <div className="section-wrap">
        <SectionHead
          eyebrow="Katman Teknolojisi"
          title="Dört katman, tek görev: kontrollü duruş."
          lead="Her Parstech balatası, görevine göre formüle edilmiş dört fonksiyonel katmandan oluşur. Dokunarak veya üzerine gelerek detayları görün."
        />
        <Reveal>
          <LayoutGroup>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {layers.map((l) => {
                const isOpen = expanded === l.num;
                return (
                  <motion.div
                    key={l.num}
                    layout
                    tabIndex={0}
                    onHoverStart={() => setExpanded(l.num)}
                    onHoverEnd={() => setExpanded(null)}
                    onFocus={() => setExpanded(l.num)}
                    onBlur={() => setExpanded(null)}
                    onClick={() =>
                      setExpanded((prev) => (prev === l.num ? null : l.num))
                    }
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-line bg-panel p-5 transition-colors hover:bg-steel focus-within:bg-steel sm:cursor-default sm:p-6"
                    style={{ borderTopColor: l.color, borderTopWidth: 3 }}
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                      {l.num}
                    </span>
                    <h3 className="mb-2 mt-2.5 font-display text-lg font-semibold">
                      {l.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 26 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-1 text-[13.5px] text-muted">{l.desc}</p>
                    </motion.div>
                    <span
                      className="mt-1.5 block font-mono text-[11px]"
                      style={{ color: l.color }}
                    >
                      {l.tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>
      </div>
    </SectionShell>
  );
}
