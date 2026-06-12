import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <>
      <Reveal>
        <div className="eyebrow">{eyebrow}</div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mb-3 font-display text-[clamp(1.65rem,5vw,2.625rem)] font-semibold leading-tight">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted sm:mb-12 sm:text-base">
            {lead}
          </p>
        </Reveal>
      )}
    </>
  );
}
