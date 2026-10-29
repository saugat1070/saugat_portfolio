import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { Section } from "./Section"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "./reui/timeline"
import { work, clients } from "../content"

export function WorkSection() {
  // Duplicate clients array into two identical halves to form a seamless infinite loop
  const clientHalf = [...clients, ...clients, ...clients]
  const marqueeClients = [...clientHalf, ...clientHalf]

  return (
    <Section id="work" index="02" label="Work">
      <Reveal>
        <Timeline defaultValue={1} className="w-full">
          {work.map((w, index) => {
            const isPresent = w.period.toLowerCase().includes("present")
            const isFreelancer = w.org.toLowerCase().includes("freelancer")
            const skills =
              "skills" in w && Array.isArray(w.skills)
                ? w.skills as string[]
                : []

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

                  {/* Infinite Moving Client Logos (Left to Right) */}
                  {isFreelancer && clients && clients.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-line/60">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
                          Working with Our valuable clients
                        </p>
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                          Pause on hover
                        </span>
                      </div>

                      {/* Infinite Left-to-Right Logo Marquee with edge fade gradient */}
                      <div
                        className="marquee-container relative w-full overflow-hidden py-1 select-none"
                        style={{
                          maskImage:
                            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                        }}
                      >
                        <div className="marquee-track-ltr items-center gap-12 sm:gap-16">
                          {marqueeClients.map((client, cIdx) => (
                            <a
                              key={`${client.name}-${cIdx}`}
                              href={client.url}
                              target="_blank"
                              rel="noreferrer"
                              title={client.name}
                              aria-label={client.name}
                              className="group/client flex items-center justify-center shrink-0 py-2 transition-transform duration-300 hover:scale-110"
                            >
                              <img
                                src={client.src}
                                alt={client.alt}
                                className="h-8 sm:h-9 md:h-9.5 w-auto max-w-[140px] object-contain transition-all duration-300 opacity-90 group-hover/client:opacity-100 dark:opacity-95 dark:brightness-115"
                                loading="lazy"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </Reveal>
    </Section>
  )
}
