import { useState } from "react"
import { Mail, Send } from "lucide-react"
import toast from "react-hot-toast"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter an email")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Thanks for subscribing!")
      setEmail("")
      setLoading(false)
    }, 800)
  }

  return (
    <>
    <section className="bg-gradient-to-r from-slate-950 to-slate-900 py-20 px-6 text-center transition duration-500 dark:from-slate-950 dark:to-black">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <Mail size={32} className="text-white" />
        </div>

        <h2 className="text-4xl font-bold mb-4 text-white sm:text-5xl">
          Stay in the loop
        </h2>

        <p className="text-slate-300 mb-8 text-lg">
          Subscribe to our newsletter for exclusive launches, style tips, and insider access to our latest collections.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mx-auto justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 max-w-md rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-white/50 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20 backdrop-blur-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-950"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <Send size={16} />
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6">
          No spam. Only the finest fashion updates and exclusive offers.
        </p>
      </div>
    </section>
    </>
  )
}

export default Newsletter