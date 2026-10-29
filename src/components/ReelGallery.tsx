import { useEffect, useRef } from "react"

export type ReelImage = { src: string alt: string }

type Props = {
  images: ReelImage[]
  /** Stage rotation in degrees. */
  tilt?: number
  /** Max travel of each reel (px) across the full scroll pass. */
  travel?: number
  /** Seconds for one full loop of a reel. */
  duration?: number
  className?: string
}

/**
 * Tilted reels of images that loop endlessly in alternating directions,
 * with an extra glide tied to page scroll.
 * Scroll progress is written to a CSS variable so React never re-renders on scroll.
 */
export function ReelGallery({
  images,
  tilt = -8,
  travel = 220,
  duration = 38,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const reels = [0, 1, 2].map((i) => images.filter((_, idx) => idx % 3 === i))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (reduce.matches) {
        el.style.setProperty("--reel-shift", "0px")
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      )
      el.style.setProperty(
        "--reel-shift",
        `${((progress - 0.5) * 2 * travel).toFixed(1)}px`,
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    reduce.addEventListener("change", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      reduce.removeEventListener("change", update)
    }
  }, [travel])

  return (
    <div
      ref={ref}
      className={`reel-gallery relative h-[440px] overflow-hidden rounded-[2px] border border-line sm:h-[540px] ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
      }}
    >
      <div
        className="absolute inset-x-[-18%] top-1/2 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
        style={{ transform: `translateY(-50%) rotate(${tilt}deg)` }}
      >
        {reels.map((reel, i) => {
          const dir = i % 2 === 0 ? -1 : 1
          // Three identical sets: the track loops by exactly one set (-33.333%),
          // leaving a buffer above and below so no gap appears mid-loop.
          const frames = [...reel, ...reel, ...reel]
          return (
            <div
              key={i}
              className={`will-change-transform ${
                i === 2 ? "hidden sm:block" : ""
              }`}
              style={{
                transform: `translateY(calc(var(--reel-shift, 0px) * ${dir}))`,
              }}
            >
              <div
                className="reel-track"
                data-dir={dir === -1 ? "up" : "down"}
                style={{
                  ["--reel-duration" as string]: `${duration + i * 6}s`,
                }}
              >
                {frames.map((img, j) => (
                  <div key={j} className="pb-4 sm:pb-5">
                    <figure className="group overflow-hidden rounded-[2px] border border-line bg-surface">
                      <img
                        src={img.src}
                        alt={j < reel.length ? img.alt : ""}
                        aria-hidden={j >= reel.length || undefined}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover opacity-90 grayscale transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
