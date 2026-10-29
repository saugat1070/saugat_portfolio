import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { contact } from "../content";

export function ContactSection() {
  return (
    <Section id="contact" index="05" label="Contact">
      <Reveal>
        <p className="max-w-[28ch] text-[26px] leading-[1.2] tracking-[-0.015em] text-ink sm:text-[30px] md:text-[36px]">
          If something here resonates, I'd be glad to hear from you.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block border-b border-muted pb-1 text-[17px] text-ink transition-colors duration-300 hover:border-ink"
        >
          {contact.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {contact.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={
                  l.href.startsWith("http") || l.href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
