import { Arrow } from "./Arrow";

const sections = [
  ["01", "About", "#about"],
  ["02", "Work", "#work"],
  ["03", "Engineering Projects", "#projects"],
  ["04", "Teaching", "#teaching"],
  ["05", "Contact", "#contact"],
];

export function SectionIndex() {
  return (
    <nav aria-label="Sections">
      <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
        {sections.map(([n, label, href], i) => (
          <li
            key={href}
            className={`bg-bg ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <a
              href={href}
              className="group flex h-full flex-col gap-5 bg-bg px-4 py-5 transition-colors duration-300 hover:bg-surface sm:gap-6 sm:py-6 md:px-5"
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted">
                {n}
              </span>
              <span className="flex items-center justify-between gap-2 text-[15px] text-ink-2 transition-colors duration-300 group-hover:text-ink">
                {label}
                <span className="translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Arrow />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
