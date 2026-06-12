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
        <h2 className="mb-3.5 font-display text-3xl font-semibold leading-tight md:text-[42px]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="mb-12 max-w-xl text-muted">{lead}</p>
        </Reveal>
      )}
    </>
  );
}
