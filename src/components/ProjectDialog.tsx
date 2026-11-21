import { useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { ArrowUpRight, ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react"
import { projects } from "../content"

export type Project = (typeof projects)[number]

export function projectImages(project: Project) {
  return [...new Set([project.poster_url, ...(project.image_url ?? [])])]
    .filter((src): src is string => !!src?.trim())
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-ink-2">
      <ImageIcon size={28} strokeWidth={1} aria-hidden="true" />
      <p className="text-sm">This image couldn’t load.</p>
    </div>
  ) : (
    <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-contain" />
  )
}

function ProjectGallery({ project }: { project: Project }) {
  const images = projectImages(project)
  const [active, setActive] = useState(0)
  if (!images.length) return null
  const change = (step: number) => setActive((current) => (current + step + images.length) % images.length)

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="h-[280px] p-3 sm:h-[420px] sm:p-5">
          <GalleryImage key={images[active]} src={images[active]} alt={`${project.title}, image ${active + 1} of ${images.length}`} />
        </div>
        <div className="flex items-center justify-between border-t border-line px-4 py-2">
          <p aria-live="polite" aria-atomic="true" className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
            {String(active + 1).padStart(2, "0")} <span className="mx-1 text-ink-2/40">/</span> {String(images.length).padStart(2, "0")}
          </p>
          {images.length > 1 && (
            <div className="flex gap-1">
              <button type="button" onClick={() => change(-1)} aria-label="Previous project image" className="project-icon-button">
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => change(1)} aria-label="Next project image" className="project-icon-button">
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
      {images.length > 1 && (
        <div role="group" aria-label="Choose a project image" className="mt-3 flex gap-2 overflow-x-auto p-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show project image ${index + 1}`}
              aria-pressed={active === index}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border bg-surface p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${active === index ? "border-ink ring-1 ring-ink" : "border-line opacity-60 hover:opacity-100"}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function ProjectDialog({ project, index }: { project: Project; index: number }) {
  const hasImages = projectImages(project).length > 0
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-sm transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
      <Dialog.Popup className="fixed left-1/2 top-1/2 z-[120] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-bg text-ink shadow-2xl outline-none transition-[opacity,scale] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/95 px-5 py-3 backdrop-blur-md sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">
            Project <span className="ml-2 text-ink">{String(index + 1).padStart(2, "0")}</span>
          </p>
          <Dialog.Close aria-label="Close project details" className="project-icon-button">
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </Dialog.Close>
        </div>
        <div className="p-5 sm:p-8">
          <Dialog.Title className="mb-6 text-[28px] font-medium leading-tight tracking-[-0.035em] sm:mb-8 sm:text-[38px]">
            {project.title}
          </Dialog.Title>
          <div className={`grid min-w-0 gap-8 ${hasImages ? "lg:grid-cols-[1.2fr_1fr] lg:gap-10" : ""}`}>
            <ProjectGallery project={project} />
            <div className="min-w-0">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">Overview</h3>
              <Dialog.Description className="mt-4 whitespace-pre-line break-words text-[15px] leading-[1.85] text-ink-2">
                {project.description}
              </Dialog.Description>
              {!!project.features?.length && (
                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">Key features</h3>
                  <ul className="mt-4 space-y-3">
                    {project.features.map((feature, featureIndex) => (
                      <li key={`${feature}-${featureIndex}`} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-ink-2" />{feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!!project.tech_stack?.length && (
                <div className="mt-8 border-t border-line pt-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-2">Built with</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech_stack.map((technology) => (
                      <li key={technology.name} className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-2 text-xs text-ink-2">
                        <img src={technology.logo_url} alt="" width={20} height={20} loading="lazy" className="size-5 rounded-sm object-contain" />
                        {technology.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(project.live_url || project.github_url) && (
                <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-xs font-medium text-bg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                      Visit website <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                      <ArrowUpRight size={15} aria-hidden="true" /> Source code<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}
