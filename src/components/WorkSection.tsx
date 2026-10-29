import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "./reui/timeline";
import { work } from "../content";

export function WorkSection() {
  return (
    <Section id="work" index="02" label="Work">
      <Reveal>
        <Timeline defaultValue={1} className="w-full">
          {work.map((w, index) => {
            const isPresent = w.period.toLowerCase().includes("present");
            const skills =
              "skills" in w && Array.isArray(w.skills)
                ? (w.skills as string[])
                : [];

            return (
              <TimelineItem key={`${w.period}-${index}`} step={index + 1}>
                <TimelineHeader>
                  <TimelineDate className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
                    {w.period}
                  </TimelineDate>
                  <TimelineTitle className="text-[17px] font-medium text-ink sm:text-[19px] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{w.role}</span>
                    <span className="font-normal text-ink-2">· {w.org}</span>
                    {isPresent && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
                      >
                        Current
                      </motion.span>
                    )}
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineIndicator className="flex items-center justify-center">
                  {isPresent ? (
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-primary" />
                  )}
                </TimelineIndicator>
                <TimelineSeparator />
                <TimelineContent className="mt-2 text-[15px] sm:text-[16px] leading-[1.7] text-ink-2 max-w-[56ch]">
                  <p>{w.note}</p>
                  {skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                          className="inline-flex cursor-default items-center rounded border border-line bg-surface/80 px-2 py-0.5 font-mono text-[11px] text-ink transition-colors hover:border-ink hover:text-ink select-none"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Reveal>
    </Section>
  );
}
