import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { work } from "../content";

export function WorkSection() {
  return (
    <Section id="work" index="02" label="Work">
      <ol className="border-t border-line">
        {work.map((w, i) => (
          <Reveal key={w.period} delay={i * 80}>
            <li className="grid gap-2 border-b border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8 sm:py-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 sm:pt-1.5">
                {w.period}
              </span>
              <div>
                <p className="text-[18px] text-ink">
                  {w.role} <span className="text-ink-2">· {w.org}</span>
                </p>
                <p className="mt-2 max-w-[56ch] text-[16px] leading-[1.7] text-ink-2">
                  {w.note}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
