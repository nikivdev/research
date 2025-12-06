import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const THEME_KEY = "theme"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const updateFromDom = () => {
      setIsDark(html.classList.contains("dark"))
    }

    setMounted(true)
    updateFromDom()

    // Keep in sync with system preference when no explicit choice is stored
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return
      const shouldBeDark = event.matches
      html.classList.toggle("dark", shouldBeDark)
      html.style.colorScheme = shouldBeDark ? "dark" : "light"
      setIsDark(shouldBeDark)
    }

    media.addEventListener("change", handleMediaChange)
    return () => media.removeEventListener("change", handleMediaChange)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)

    if (newDark) {
      document.documentElement.classList.add("dark")
      document.documentElement.style.colorScheme = "dark"
      localStorage.setItem(THEME_KEY, "dark")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.colorScheme = "light"
      localStorage.setItem(THEME_KEY, "light")
    }
  }

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="fixed top-4 right-4 z-50 h-10 w-10 rounded-lg border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun size={20} className="text-amber-400" />
      ) : (
        <Moon size={20} className="text-slate-700" />
      )}
    </button>
  )
}
