import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { projects } from "../content";

export function ProjectsSection() {
  return (
    <Section id="projects" index="03" label="Engineering Projects">
      <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.index} className="bg-bg">
            <Reveal delay={(i % 2) * 80} className="h-full">
              <a
                href={p.href}
                className="group flex h-full flex-col bg-bg p-6 transition-colors duration-300 hover:bg-surface md:p-7"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
                  <span>
                    <span className="text-muted">{p.index}</span>
                    <span className="ml-3">{p.year}</span>
                  </span>
                  <span className="text-muted transition-colors duration-300 group-hover:text-ink">
                    <Arrow />
                  </span>
                </div>
                <h3 className="mt-10 text-[20px] tracking-[-0.01em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-ink-2">
                  {p.summary}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.06em] text-ink-2">
                  {p.stack}
                </p>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
