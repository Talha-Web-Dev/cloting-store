import { Star } from "lucide-react"

function ReviewCard({ review }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-950/80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">{review.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{review.date}</p>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="h-4 w-4" />
          ))}
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300">{review.text}</p>
    </div>
  )
}

export default ReviewCard
