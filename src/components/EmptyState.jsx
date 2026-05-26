function EmptyState({
  title = "Nothing Here",
  text = "No data available.",
  buttonText = "Go Back",
  onClick,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 px-4 text-center shadow-sm transition duration-300 dark:border-slate-700 dark:bg-slate-900">
      {Icon && (
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600">
          <Icon size={40} />
        </div>
      )}

      <h1 className="text-3xl font-bold text-slate-950 dark:text-white mb-3">
        {title}
      </h1>

      <p className="max-w-md text-slate-600 dark:text-slate-400 mb-6">
        {text}
      </p>

      {buttonText && (
        <button
          onClick={onClick}
          className="rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
