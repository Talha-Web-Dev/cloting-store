function Button({
  children,
  className = "",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button