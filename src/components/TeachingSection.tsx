import { Reveal } from "./Reveal"
import { ReelGallery } from "./ReelGallery"
import { teaching } from "../content"

const meta = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2"

export function TeachingSection() {
  return (
    <section
      id="teaching"
      className="border-t border-line py-16 md:py-20 lg:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className={meta}>
              <span className="text-muted">04</span>
              <span className="mx-2 text-muted">/</span>
              Teaching &amp; Mentoring
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-[34ch] text-[22px] leading-[1.4] tracking-[-0.01em] text-ink sm:text-[24px] md:mt-10 lg:text-[28px]">
              {teaching.intro}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.75] text-ink-2 md:text-[17px]">
              {teaching.note}
            </p>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <ReelGallery images={teaching.images} />
        </Reveal>
      </div>
    </section>
  )
}
