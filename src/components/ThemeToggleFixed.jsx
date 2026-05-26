import { useContext } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemeToggleFixed() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  if (!theme) return null

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-transparent bg-white/90 p-1 shadow-lg transition-transform duration-200 hover:scale-105 dark:bg-slate-900/85 dark:shadow-lg"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 40 : 0, scale: theme === "dark" ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-slate-600" />
        )}
      </motion.div>
    </button>
  )
}
