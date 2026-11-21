import { Dialog } from "@base-ui/react/dialog"
import { ArrowDownRight, ImageIcon } from "lucide-react"
import { Reveal } from "./Reveal"
import { ProjectDialog, projectImages, type Project } from "./ProjectDialog"
import { projects } from "../content"

/* ── Bento layout helper ──────────────────────────────────────────────
 *  3-column grid. First card is "featured" (2 cols × 2 rows).
 *  Last card in an odd remainder fills the bottom row nicely.
 * ──────────────────────────────────────────────────────────────────── */

function getItemClass(index: number, total: number): string {
  if (index === 0 && total >= 3) return "lg:col-span-2 lg:row-span-2"
  if (total === 5 && index === 4) return "lg:col-span-2"
  if (total === 4 && index === 3) return "lg:col-span-3"
  return ""
}

/* ── Card Component ────────────────────────────────────────────────── */

function BentoCard({
  project,
  index,
  featured = false,
}: {
  project: Project
  index: number
  featured?: boolean
}) {
  const images = projectImages(project)
  const stack = project.tech_stack ?? []

  return (
    <Dialog.Root>
      <article aria-label={project.title} className="group relative h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] sm:rounded-[32px] border border-line bg-surface dark:bg-[#151413] shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4)]">
          {/* Grid-pattern placeholder (visible if image fails or before load) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
          >
            <ImageIcon size={36} strokeWidth={0.5} className="text-ink-2/30" />
          </div>

          {/* Ambient blurred backdrop of the poster */}
          {images[0] && (
            <img
              src={images[0]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 blur-3xl scale-125"
            />
          )}

          {/* Main image: fitted in its true original aspect ratio without cropping */}
          {images[0] && (
            <div className="absolute inset-0 z-[1] flex items-center justify-center p-4 sm:p-6 pb-28 sm:pb-32">
              <img
                src={images[0]}
                alt={project.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain rounded-xl sm:rounded-2xl shadow-md transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden"
                }}
              />
            </div>
          )}

          {/* Dark gradient overlay to guarantee text and badge legibility */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.1)_60%,transparent_100%)]"
          />

          {/* Subtle shine sweep on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Content: Title & Full-Color Tech Stack over the image */}
          <div className="relative z-[4] mt-auto flex flex-col justify-end p-5 sm:p-6 lg:p-7">
            <h3
              className={`font-medium leading-[1.15] tracking-[-0.025em] text-white ${
                featured
                  ? "text-[26px] sm:text-[32px] lg:text-[38px]"
                  : "text-[20px] sm:text-[22px] lg:text-[24px]"
              }`}
            >
              {project.title}
            </h3>

            {stack.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {stack.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-2.5 py-1 backdrop-blur-md shadow-sm transition-all duration-200 group-hover:border-white/30 group-hover:bg-black/80"
                  >
                    <img
                      src={t.logo_url}
                      alt={t.name}
                      width={16}
                      height={16}
                      loading="lazy"
                      className="size-4 object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                    <span className="font-mono text-[10px] text-white/90 tracking-wide">
                      {t.name}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full-card dialog trigger */}
        <Dialog.Trigger
          aria-label={`View ${project.title} project details`}
          className="absolute inset-0 z-10 cursor-pointer rounded-[28px] sm:rounded-[32px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
        />
      </article>
      <ProjectDialog project={project} index={index} />
    </Dialog.Root>
  )
}

/* ── Section Component ─────────────────────────────────────────────── */

export function ProjectsSection() {
  if (!projects.length) return null

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line py-16 md:py-20 lg:py-24"
    >
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <h2
              id="projects-heading"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2"
            >
              <span className="text-ink-2/60">03</span>
              <span className="mx-2 text-ink-2/50">/</span>Engineering Projects
            </h2>
            <p className="mt-5 text-[40px] leading-[1.05] tracking-[-0.055em] sm:text-[56px]">
              Ideas, made{" "}
              <span className="font-serif italic font-normal text-ink-2">
                real.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4 pb-1">
            <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-ink-2">
              Selected work
              <br />
              {String(projects.length).padStart(2, "0")}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </span>
            <ArrowDownRight
              size={34}
              strokeWidth={1}
              className="text-ink-2"
              aria-hidden="true"
            />
          </div>
        </div>
      </Reveal>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(380px,auto)]">
        {projects.map((project, index) => (
          <li
            key={`${project.title}-${index}`}
            className={`min-h-[380px] sm:min-h-[420px] ${getItemClass(index, projects.length)}`}
          >
            <Reveal className="h-full" delay={index * 80}>
              <BentoCard
                project={project}
                index={index}
                featured={index === 0 && projects.length >= 3}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
