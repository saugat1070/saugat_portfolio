import { useEffect, useState, type ReactNode } from 'react'
import { cv } from '../content'
import { ThemeIcon, ThemeToggle, useTheme } from './ThemeToggle'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const items: { label: string; id: string; icon: ReactNode }[] = [
  {
    label: 'About',
    id: 'about',
    icon: (
      <g {...stroke}>
        <circle cx="10" cy="7" r="3.25" />
        <path d="M3.75 16.75c.9-3 3.3-4.5 6.25-4.5s5.35 1.5 6.25 4.5" />
      </g>
    ),
  },
  {
    label: 'Work',
    id: 'work',
    icon: (
      <g {...stroke}>
        <rect x="2.75" y="6" width="14.5" height="10.25" rx="1.75" />
        <path d="M7.25 6V4.5c0-.7.55-1.25 1.25-1.25h3c.7 0 1.25.55 1.25 1.25V6M2.75 10.5h14.5" />
      </g>
    ),
  },
  {
    label: 'Projects',
    id: 'projects',
    icon: (
      <g {...stroke}>
        <path d="M7 6 3 10l4 4M13 6l4 4-4 4M11.25 4.5l-2.5 11" />
      </g>
    ),
  },
  {
    label: 'Contact',
    id: 'contact',
    icon: (
      <g {...stroke}>
        <rect x="2.75" y="4.5" width="14.5" height="11" rx="1.75" />
        <path d="m3.5 5.5 6.5 5 6.5-5" />
      </g>
    ),
  },
]

const iconButton =
  'grid size-8 place-items-center rounded-full text-ink-2 transition-colors duration-300 hover:bg-bg hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink'

/** Id of the section currently in the middle band of the viewport (null over the hero). */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)
        setActive(items.find((i) => visible.has(i.id))?.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return active
}

function CvLink() {
  return (
    <a href={cv.href} target="_blank" rel="noreferrer" aria-label="Open CV in a new tab" title="View CV" className={iconButton}>
      <svg viewBox="0 0 16 16" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <path
          d="M9.5 1.75H4.5A1.25 1.25 0 0 0 3.25 3v10A1.25 1.25 0 0 0 4.5 14.25h7A1.25 1.25 0 0 0 12.75 13V5L9.5 1.75ZM9.5 1.75V5h3.25M5.75 8.5h4.5M5.75 11h3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

// Bottom tab bar order: sections first, then Resume and the theme toggle.
const mobileTabs = ['about', 'projects', 'contact']

const tabLabel = 'text-[10px] font-medium leading-none tracking-[0.01em]'
const tabClass = (on: boolean) =>
  `flex flex-1 flex-col items-center justify-center gap-1 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink ${
    on ? 'text-ink' : 'text-ink-2 hover:text-ink'
  }`

function TabIcon({ on, children }: { on: boolean; children: ReactNode }) {
  return <span className={`grid h-7 w-11 place-items-center rounded-full transition-colors duration-300 ${on ? 'bg-bg' : ''}`}>{children}</span>
}

function MobileThemeTab() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={tabClass(false)}
    >
      <TabIcon on={false}>
        <ThemeIcon dark={isDark} className="size-[18px]" />
      </TabIcon>
      <span className={tabLabel}>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}

export function Navbar() {
  const active = useActiveSection()

  return (
    <>
      {/* Sticky pill navbar from md up; phones use the bottom tab bar instead */}
      <header className="sticky top-4 z-50 hidden px-8 md:block">
        <nav
          className="mx-auto flex h-[50px] max-w-[1136px] items-center justify-between rounded-full border border-line bg-surface/90 pl-5 pr-2 backdrop-blur-md transition-colors duration-300"
          style={{ boxShadow: 'var(--nav-shadow)' }}
          aria-label="Primary"
        >
          <a href="#top" className="text-[14px] font-medium tracking-tight text-ink">
            Saugat Giri
          </a>
          <div className="flex items-center gap-1">
            <ul className="hidden items-center md:flex">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 hover:text-ink ${
                      active === item.id ? 'text-ink' : 'text-ink-2'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <span className="mx-1 hidden h-4 w-px bg-line md:block" aria-hidden />
            <CvLink />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Floating app-style tab bar on phones and small tablets */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 z-50 px-4 md:hidden"
        style={{ bottom: 'max(14px, env(safe-area-inset-bottom))' }}
      >
        <ul
          className="mx-auto grid h-[62px] max-w-[440px] grid-cols-5 rounded-full border border-line bg-surface/90 px-1.5 backdrop-blur-md transition-colors duration-300"
          style={{ boxShadow: 'var(--nav-shadow)' }}
        >
          {mobileTabs.map((id) => {
            const item = items.find((i) => i.id === id)!
            const on = active === id
            return (
              <li key={id} className="flex">
                <a href={`#${id}`} aria-current={on ? 'location' : undefined} className={tabClass(on)}>
                  <TabIcon on={on}>
                    <svg viewBox="0 0 20 20" className="size-[19px]" aria-hidden>
                      {item.icon}
                    </svg>
                  </TabIcon>
                  <span className={tabLabel}>{item.label}</span>
                </a>
              </li>
            )
          })}
          <li className="flex">
            <a href={cv.href} target="_blank" rel="noreferrer" aria-label="Open résumé in a new tab" className={tabClass(false)}>
              <TabIcon on={false}>
                <svg viewBox="0 0 20 20" className="size-[19px]" aria-hidden>
                  <g {...stroke}>
                    <path d="M11.75 2.75H6A1.75 1.75 0 0 0 4.25 4.5v11A1.75 1.75 0 0 0 6 17.25h8a1.75 1.75 0 0 0 1.75-1.75V6.75l-4-4ZM11.75 2.75v4h4M7.5 10.5h5M7.5 13.5h3.5" />
                  </g>
                </svg>
              </TabIcon>
              <span className={tabLabel}>Resume</span>
            </a>
          </li>
          <li className="flex">
            <MobileThemeTab />
          </li>
        </ul>
      </nav>
    </>
  )
}
