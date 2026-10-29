import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Reveal } from "./Reveal"

export function Section({
  id,
  index,
  label,
  children,
}: {
  id: string
  index: string
  label: string
  children: ReactNode
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.5 }}
      className="border-t border-line py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <Reveal y={16}>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
            <span className="text-muted">{index}</span>
            <span className="mx-2 text-muted">/</span>
            {label}
          </h2>
        </Reveal>
        <div>{children}</div>
      </div>
    </motion.section>
  )
}
