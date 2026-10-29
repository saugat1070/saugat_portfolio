import { motion } from "framer-motion";
import { Arrow } from "./Arrow";

const sections = [
  ["01", "About", "#about"],
  ["02", "Work", "#work"],
  ["03", "Engineering Projects", "#projects"],
  ["04", "Contact", "#contact"],
];

export function SectionIndex() {
  return (
    <nav aria-label="Sections">
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-6% 0px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06 },
          },
        }}
        className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4"
      >
        {sections.map(([n, label, href]) => (
          <motion.li
            key={href}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="bg-bg"
          >
            <a
              href={href}
              className="group flex h-full flex-col gap-5 bg-bg px-4 py-5 transition-colors duration-200 hover:bg-surface sm:gap-6 sm:py-6 md:px-5"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink-2/70 transition-colors group-hover:text-ink">
                {n}
              </span>
              <span className="flex items-center justify-between gap-2 text-[15px] text-ink-2 transition-colors duration-200 group-hover:text-ink">
                {label}
                <span className="translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100">
                  <Arrow />
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
}
