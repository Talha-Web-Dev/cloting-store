import { Zap } from "lucide-react"

function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white transition duration-500 dark:from-blue-900 dark:to-purple-900">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Zap size={18} className="animate-pulse" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Free shipping on orders above Rs. 5000 • Limited-time summer collection now live
          </p>
          <Zap size={18} className="animate-pulse" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-pulse" />
    </div>
  )
}

export default AnnouncementBar