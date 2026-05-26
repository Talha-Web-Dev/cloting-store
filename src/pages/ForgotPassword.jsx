import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"
import toast from "react-hot-toast"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Reset link sent to your email")
      setLoading(false)
      setEmail("")
    }, 900)
  }

  return (
    <section className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100 transition duration-500">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24 sm:px-10">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl backdrop-blur-xl transition duration-300 dark:border-slate-700/70 dark:bg-slate-950/70">
          <div className="mb-8 flex flex-col gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Forgot Password</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Reset your password</h1>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Enter your email address and we'll send you a secure link to reset your account password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
            >
              {loading ? "Sending reset link..." : "Send reset link"}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <p>
              Remembered your password? <Link to="/login" className="font-semibold text-slate-950 dark:text-white hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
