import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="mt-24 hidden w-full pt-20 md:block">
      <div className="group relative flex w-full select-none items-center justify-center overflow-hidden px-4 pb-6 pt-4">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01 }}
          className="w-full text-center font-sans font-black uppercase tracking-[0.14em] lg:tracking-[0.18em] transition-all duration-500 group-hover:[-webkit-text-stroke-color:var(--ink)] cursor-default select-none"
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
          Saugat
        </motion.span>
      </div>
    </footer>
  )
}
