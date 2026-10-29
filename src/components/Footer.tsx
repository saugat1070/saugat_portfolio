import { motion } from "framer-motion"
import { contact } from "../content"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 w-full border-t border-line pt-12 md:mt-24 md:pt-20">
      {/* Full-bleed giant outlined wordmark stretching across screen */}
      <div
        aria-hidden="true"
        className="group relative flex w-full select-none items-center justify-center overflow-hidden px-4 pb-2 pt-2 md:pb-6 md:pt-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01 }}
          className="w-full text-center font-sans font-black uppercase tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.14em] lg:tracking-[0.18em] transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--ink)] cursor-default select-none"
          style={{
            fontSize: "clamp(3.5rem, 16.2vw, 17rem)",
            lineHeight: 0.85,
            WebkitTextStroke:
              "clamp(1.5px, 0.2vw, 2.75px) color-mix(in oklab, var(--ink) 48%, transparent)",
            color: "transparent",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.1) 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.1) 95%, transparent 100%)",
          }}
        >
          SAUGAT
        </motion.span>
      </div>

      {/* Full-width horizontal divider */}
      <div className="w-full border-t border-line/70" />

      {/* Bottom utility bar with generous horizontal padding */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2 sm:flex-row sm:items-center sm:px-8 sm:text-[12px] md:px-12">
        {/* Left: Copyright and signature statement */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span>© {currentYear} Saugat Giri</span>
          <span className="text-line" aria-hidden>
            /
          </span>
          <span className="font-deva text-[13px] tracking-normal text-ink/80">
            योगः कर्मसु कौशलम्
          </span>
        </div>

        {/* Right: Quick navigation and external links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {contact.links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={
                link.href.startsWith("http") || link.href.endsWith(".pdf")
                  ? "_blank"
                  : undefined
              }
              rel="noreferrer"
              whileHover={{ y: -1.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="transition-colors duration-200 hover:text-ink inline-block"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#top"
            aria-label="Back to top"
            whileHover={{ y: -1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-ink"
          >
            <span>Top</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden
            >
              ↑
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
