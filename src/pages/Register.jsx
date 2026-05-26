import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

function Register() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions")
      return
    }

    setLoading(true)

    try {
      await register({ name, email, password })
      navigate("/profile", { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100 transition duration-500">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-24 sm:px-10">
        <div className="w-full max-w-2xl space-y-10">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white p-10 shadow-2xl backdrop-blur-xl transition duration-300 dark:border-slate-700/70 dark:bg-slate-950/70">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Lush Stitches</p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl text-slate-950 dark:text-white">Create your premium account</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Join the Lush Stitches community for effortless luxury and exclusive style updates.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                Full name
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                />
              </label>

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

              <div className="grid gap-6 sm:grid-cols-2">
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

                <label className="block text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
                  Confirm password
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                  />
                </label>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 bg-white/80 text-slate-900 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/70"
                />
                <label>
                  I agree to the <span className="font-semibold text-slate-900 dark:text-white">terms & conditions</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
              <p>Sign up with</p>
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
            <p className="text-sm">Already have an account?</p>
            <Link to="/login" className="mt-3 inline-block text-base font-semibold text-slate-900 dark:text-white hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register