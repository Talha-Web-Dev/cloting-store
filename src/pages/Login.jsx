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
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_25%),linear-gradient(180deg,_#050505,_#111827)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24 sm:px-10">
        <div className="w-full max-w-2xl space-y-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex flex-col gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Lush Stitches</p>
                <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Sign in to your account</h1>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Enter your details below to continue shopping with a premium fashion experience.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </label>

              <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Password
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-slate-900 focus:ring-white"
                  />
                  Remember me
                </label>
                <Link to="/" className="text-sm font-medium text-slate-100 hover:text-white">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-300">
              <p>Or sign in with</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <button type="button" className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10">
                  Continue with Google
                </button>
                <button type="button" className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10">
                  Continue with Apple
                </button>
                <button type="button" className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20 hover:bg-white/10">
                  Continue with Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center text-slate-300 shadow-2xl backdrop-blur-xl">
            <p className="text-sm">New to Lush Stitches?</p>
            <Link to="/register" className="mt-3 inline-block text-base font-semibold text-white hover:text-slate-100">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login