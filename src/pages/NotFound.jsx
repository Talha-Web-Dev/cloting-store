import { Link } from "react-router-dom"
import { ArrowRight, Home } from "lucide-react"

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center px-6 py-24">
      <div className="text-center space-y-8">
        {/* 404 Display */}
        <div className="space-y-4">
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            The page you're looking for has taken a holiday or doesn't exist. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-8 py-4 text-sm font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 text-white px-8 py-4 text-sm font-semibold transition hover:bg-white/10 backdrop-blur-sm"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="pt-12 text-slate-500 text-sm">
          <p>Need help? <Link to="/profile" className="text-blue-400 hover:text-blue-300">Contact support</Link></p>
        </div>
      </div>
    </div>
  )
}

export default NotFound