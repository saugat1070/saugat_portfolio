import { useEffect, useId, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Trophy,
} from "lucide-react"
import { achievements } from "../content"

const meta = "font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2"
const control =
  "grid size-9 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:border-ink-2 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-40"

function AchievementGallery({
  photos,
  title,
}: {
  photos: string[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(track, { amount: 0.5 })
  const multiple = photos.length > 1
  const playing =
    multiple && !paused && !hovered && !focused && !reduceMotion && inView

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      const el = track.current
      if (!el || document.hidden) return
      const current = Math.round(el.scrollLeft / el.clientWidth)
      el.scrollTo({
        left: ((current + 1) % photos.length) * el.clientWidth,
        behavior: "smooth",
      })
    }, 4500)
    return () => window.clearInterval(timer)
  }, [playing, photos.length])

  function goTo(index: number) {
    setPaused(true)
    const el = track.current
    if (!el) return
    el.scrollTo({
      left: ((index + photos.length) % photos.length) * el.clientWidth,
      behavior: reduceMotion ? "instant" : "smooth",
    })
  }

  return (
    <div
      role="region"
      aria-roledescription={multiple ? "carousel" : undefined}
      aria-label={`${title} photos`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      }}
      className="min-w-0"
    >
      <div
        ref={track}
        tabIndex={multiple ? 0 : undefined}
        aria-label={
          multiple
            ? "Photo gallery. Use left and right arrow keys to browse."
            : undefined
        }
        onPointerDown={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            goTo(active + (event.key === "ArrowRight" ? 1 : -1))
          }
        }}
        onScroll={(event) => {
          const el = event.currentTarget
          if (el.clientWidth)
            setActive(Math.round(el.scrollLeft / el.clientWidth))
        }}
        className="achievement-gallery flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-md bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {photos.map((src, index) => (
          <div
            key={`${src}-${index}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photos.length}`}
            className="group/photo h-[210px] w-full shrink-0 snap-center snap-always overflow-hidden sm:h-[240px]"
          >
            <img
              src={src}
              alt={`${title} — event photo ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-[1.03] object-cover grayscale transition-transform duration-700 ease-out group-hover/photo:scale-[1.08] motion-reduce:transition-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function AchievementsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()
  const cardId = useId()
  if (!achievements.length) return null
  const achievement = achievements[active]
  const title = achievement.title.trim()
  const photos = achievement.photos ?? []

  function changeAchievement(step: number) {
    setDirection(step)
    setActive(
      (current) => (current + step + achievements.length) % achievements.length,
    )
  }

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="border-t border-line py-16 md:py-20 lg:py-24"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2
          id="achievements-heading"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2"
        >
          <span className="text-ink-2/50">05</span>
          <span className="mx-2 text-ink-2/50">/</span>Achievements
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={`${meta} sr-only min-[400px]:not-sr-only`}
            aria-live="polite"
            aria-atomic="true"
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(achievements.length).padStart(2, "0")}
          </span>
          {achievements.length > 1 && (
            <>
              <button
                type="button"
                className={control}
                aria-label="Previous achievement"
                aria-controls={cardId}
                onClick={() => changeAchievement(-1)}
              >
                <ArrowLeft size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={control}
                aria-label="Next achievement"
                aria-controls={cardId}
                onClick={() => changeAchievement(1)}
              >
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
      <div
        id={cardId}
        role="region"
        aria-roledescription="carousel"
        aria-label="Achievements"
        className="overflow-hidden"
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.article
            key={title}
            custom={direction}
            variants={{
              enter: (step: number) => ({
                opacity: 0,
                x: reduceMotion ? 0 : step * 28,
              }),
              visible: { opacity: 1, x: 0 },
              exit: (step: number) => ({
                opacity: 0,
                x: reduceMotion ? 0 : step * -28,
              }),
            }}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`grid min-w-0 gap-4 bg-bg sm:gap-6 ${
              photos.length
                ? "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                : ""
            }`}
          >
            {photos.length > 0 && (
              <AchievementGallery photos={photos} title={title} />
            )}
            <div className="flex flex-col items-start justify-center md:py-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">
                <Trophy size={13} strokeWidth={1.5} aria-hidden="true" />
                {achievement.position} place
              </span>
              <h3 className="mt-2 text-[21px] leading-[1.25] tracking-[-0.025em] text-ink sm:text-[24px]">
                {title}
              </h3>
              {achievement.description.trim() && (
                <p className="mt-2 text-[14px] leading-[1.65] text-ink-2">
                  {achievement.description}
                </p>
              )}
              {(achievement.github_url?.trim() ||
                achievement.posts?.length) && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {achievement.github_url?.trim() && (
                    <a
                      href={achievement.github_url.trim()}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[12px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      <Code2 size={14} aria-hidden="true" />
                      View project
                      <ArrowUpRight
                        size={13}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                  {achievement.posts?.map((href, index) => (
                    <a
                      key={href}
                      href={href.trim()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                      Read post
                      {achievement.posts!.length > 1 ? ` ${index + 1}` : ""}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
