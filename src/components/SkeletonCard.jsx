function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-80 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600" />

      <div className="space-y-3">
        <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-4/6 rounded-full bg-slate-200 dark:bg-slate-700" />

        <div className="pt-2 flex items-center justify-between">
          <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard