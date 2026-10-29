import { motion } from "framer-motion"
import { useTheme } from "./ThemeToggle"
import { techStack } from "../content"

const meta = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2"

export function TechStack() {
  const { theme } = useTheme()

  return (
    <div className="border border-line">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-4 sm:px-5 md:px-6">
        <p className={meta}>Tech Stack & Tools</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2">
          Backend · Systems · Cloud
        </span>
      </div>

      {/* Centered skillicons display with responsive layout and theme sync */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center p-4 sm:p-6 bg-surface/30 overflow-x-auto"
      >
        <img
          alt="Node/Express/TS"
          src={`${techStack.rawUrl}&perline=15&theme=${theme}`}
          className="max-w-full h-auto hidden sm:block"
          loading="lazy"
        />
        <img
          alt="Node/Express/TS"
          src={`${techStack.rawUrl}&perline=8&theme=${theme}`}
          className="max-w-full h-auto block sm:hidden"
          loading="lazy"
        />
      </motion.div>

      {/* Categorized tech stack list with interactive hover badges */}
      <div className="grid grid-cols-1 border-t border-line divide-y divide-line sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        {techStack.categories.map((category) => (
          <div key={category.title} className="p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 mb-2.5">
              {category.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex cursor-default items-center rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-ink transition-colors duration-200 hover:border-ink hover:text-ink select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
