import { useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// One shared theme store so every toggle (top navbar, bottom tab bar) stays in sync.
let theme: Theme = initialTheme()
const listeners = new Set<() => void>()

function setTheme(next: Theme) {
  theme = next
  localStorage.setItem('theme', next)
  document.documentElement.classList.toggle('dark', next === 'dark')
  listeners.forEach((l) => l())
}

export function useTheme() {
  const value = useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => theme,
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])
  return { theme: value, toggle: () => setTheme(value === 'dark' ? 'light' : 'dark') }
}

export function ThemeIcon({ dark, className = 'size-[15px]' }: { dark: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      {dark ? (
        <>
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" strokeLinecap="round" />
        </>
      ) : (
        <path d="M13.5 9.6A5.5 5.5 0 0 1 6.4 2.5a5.5 5.5 0 1 0 7.1 7.1Z" strokeLinejoin="round" />
      )}
    </svg>
  )
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-8 place-items-center rounded-full text-ink-2 transition-colors duration-300 hover:bg-bg hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink"
    >
      <ThemeIcon dark={isDark} />
    </button>
  )
}
