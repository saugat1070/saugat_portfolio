import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { GitHubActivity } from "./GitHubActivity";
import { about, github } from "../content";

export function AboutSection() {
  return (
    <Section id="about" index="01" label="About">
      <div className="max-w-[60ch] space-y-6">
        {about.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <p
              className={
                i === 0
                  ? "text-[20px] leading-[1.45] tracking-[-0.01em] text-ink sm:text-[22px] md:text-[24px]"
                  : "text-[16px] leading-[1.75] text-ink-2 sm:text-[17px]"
              }
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120} className="mt-10 sm:mt-14">
        <GitHubActivity
          username={github.username}
          mergeLanguages={github.mergeLanguages}
          hideLanguages={github.hideLanguages}
        />
      </Reveal>
    </Section>
  );
}
