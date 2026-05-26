import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-12 w-24 items-center rounded-full border border-slate-300/20 bg-white/80 p-1 text-slate-900 shadow-lg shadow-slate-950/10 transition duration-300 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-500/30 dark:bg-slate-950/80 dark:text-slate-100 dark:hover:border-slate-300"
      aria-label="Toggle theme"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`absolute left-1 top-1 h-10 w-10 rounded-full bg-slate-950 text-slate-100 shadow-lg shadow-slate-950/30 transition dark:bg-white dark:text-slate-950`}
        animate={{ x: theme === "dark" ? 24 : 0 }}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-2 text-xs uppercase tracking-[0.32em]">
        <Sun className="h-4 w-4 text-amber-400" />
        <Moon className="h-4 w-4 text-slate-500" />
      </span>
    </button>
  )
}

export default ThemeToggle
