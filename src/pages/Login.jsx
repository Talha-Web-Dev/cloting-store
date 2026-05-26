import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/profile"

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const [remember, setRemember] = useState(false)

  return (
    <section className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100 transition duration-500">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24 sm:px-10">
        <div className="w-full max-w-2xl space-y-10">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white p-10 shadow-2xl backdrop-blur-xl transition duration-300 dark:border-slate-700/70 dark:bg-slate-950/70">
            <div className="mb-8 flex flex-col gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Lush Stitches</p>
                <h1 className="mt-4 text-4xl font-semibold sm:text-5xl text-slate-950 dark:text-white">Sign in to your account</h1>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Enter your details below to continue shopping with a premium fashion experience.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                />
              </label>

              <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                Password
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 bg-white/80 text-slate-900 dark:border-slate-700 dark:bg-slate-900/70"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
              <p>Or sign in with</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <button type="button" className="rounded-3xl border border-slate-200/70 bg-white/5 px-4 py-3 text-sm transition hover:border-slate-300/70 hover:bg-white/10 dark:border-slate-700 dark:bg-slate-900/70">
                  Continue with Google
                </button>
                <button type="button" className="rounded-3xl border border-slate-200/70 bg-white/5 px-4 py-3 text-sm transition hover:border-slate-300/70 hover:bg-white/10 dark:border-slate-700 dark:bg-slate-900/70">
                  Continue with Apple
                </button>
                <button type="button" className="rounded-3xl border border-slate-200/70 bg-white/5 px-4 py-3 text-sm transition hover:border-slate-300/70 hover:bg-white/10 dark:border-slate-700 dark:bg-slate-900/70">
                  Continue with Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/5 p-6 text-center text-slate-600 shadow-2xl backdrop-blur-xl transition duration-300 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
            <p className="text-sm">New to Lush Stitches?</p>
            <Link to="/register" className="mt-3 inline-block text-base font-semibold text-slate-900 dark:text-white hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login