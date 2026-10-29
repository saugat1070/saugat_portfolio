import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { verse, statement } from "../content";

const meta = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2";

export function Hero() {
  return (
    <div className="mx-auto max-w-300 px-6 md:px-8">
      <section className="grid gap-8 border-b border-line pt-10 sm:pt-12 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pt-16 lg:gap-12 lg:pt-20">
        <div className="order-2 pb-16 md:order-1 md:pb-20 lg:pb-24">
          <Reveal>
            <p className={meta}>Saugat Giri — Software Engineer</p>
          </Reveal>

          <Reveal delay={100}>
            <blockquote
              lang="sa"
              className="mt-8 font-deva text-[22px] font-light leading-[1.9] text-ink sm:text-[26px] md:mt-10 lg:text-[28px]"
            >
              {verse.devanagari.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </blockquote>
            <p className={`${meta} mt-4`}>
              <span className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-muted align-middle" />
              {verse.reference}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-8 max-w-[30ch] text-[28px] font-normal leading-[1.15] tracking-[-0.015em] text-ink sm:text-[34px] md:mt-10 md:text-[32px] lg:text-[42px]">
              {verse.translation}
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 max-w-[52ch] text-[16px] italic leading-[1.75] text-ink-2 md:text-[17px]">
              {statement}
            </p>
          </Reveal>
        </div>

        {/* Cutout portrait fills the full hero height with smooth entrance and micro-interaction */}
        <Reveal
          delay={150}
          className="relative order-1 md:order-2 md:min-h-[460px]"
        >
          <motion.img
            src="/saugat-hero.webp"
            alt="Portrait of Saugat Giri"
            width={1305}
            height={1600}
            fetchPriority="high"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.015 }}
            className="mx-auto block h-auto w-full max-w-[320px] select-none [mask-image:linear-gradient(to_bottom,black_78%,transparent)] sm:max-w-[380px] md:absolute md:inset-y-0 md:left-0 md:h-full md:max-w-[500px] md:object-contain md:object-bottom md:[mask-image:none] transition-transform duration-500"
          />
        </Reveal>
      </section>
    </div>
  );
}
