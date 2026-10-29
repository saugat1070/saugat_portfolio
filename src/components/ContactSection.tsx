import { motion } from "framer-motion"
import { Arrow } from "./Arrow"
import { Reveal } from "./Reveal"
import { Section } from "./Section"
import { contact } from "../content"

export function ContactSection() {
  return (
    <Section id="contact" index="05" label="Contact">
      <Reveal>
        <p className="max-w-[28ch] text-[26px] leading-[1.2] tracking-[-0.015em] text-ink sm:text-[30px] md:text-[36px]">
          If something here resonates, I'd be glad to hear from you.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <motion.a
          href={`mailto:${contact.email}`}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="mt-8 inline-block border-b border-muted pb-1 text-[17px] text-ink transition-colors duration-300 hover:border-ink"
        >
          {contact.email}
        </motion.a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {contact.links.map((l) => (
            <motion.li
              key={l.label}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <a
                href={l.href}
                target={
                  l.href.startsWith("http") || l.href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <Arrow />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
