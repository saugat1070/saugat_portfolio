import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

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
    <section id={id} className="border-t border-line py-16 md:py-20 lg:py-24">
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
            <span className="text-muted">{index}</span>
            <span className="mx-2 text-muted">/</span>
            {label}
          </p>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  )
}
