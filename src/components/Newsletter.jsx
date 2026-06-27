import { useState } from "react"
import { Mail } from "lucide-react"

function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <section className="bg-brand-bg py-24 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brand-border bg-white p-10 shadow-premium">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-charcoal text-brand-bg">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-charcoal">Stay ahead with every release</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-brand-muted">
            Sign up for new arrivals, exclusive offers, and styling stories from our editorial edit.
          </p>

          <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full border border-brand-border bg-brand-bg px-6 py-4 text-brand-charcoal placeholder:text-brand-muted outline-none focus:border-brand-charcoal focus:ring-2 focus:ring-brand-beige"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-8 py-4 text-sm font-semibold text-brand-bg transition hover:bg-slate-950"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter