import { createContext, useEffect, useLayoutEffect, useMemo, useState } from "react"

export const ThemeContext = createContext()
const STORAGE_KEY = "lush-theme"

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  // Apply theme synchronously before paint to avoid flicker
  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const el = document.documentElement
    el.classList.toggle("dark", theme === "dark")
    el.style.colorScheme = theme
  }, [theme])

  // Persist and animate transitions when theme changes
  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, theme)

    const el = document.documentElement
    // Add helper class that enables smooth transitions for themeable properties
    el.classList.add("theme-transition")
    const t = setTimeout(() => el.classList.remove("theme-transition"), 400)

    return () => clearTimeout(t)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider