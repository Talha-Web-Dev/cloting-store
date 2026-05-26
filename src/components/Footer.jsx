import { Link } from "react-router-dom"
import { Send } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-white text-slate-950 transition duration-500 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 xl:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950/10 text-lg font-bold text-slate-950 shadow-lg shadow-slate-950/10 dark:bg-white/10 dark:text-white">
                LS
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Lush Stitches</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Luxury fashion essentials</h2>
              </div>
            </div>
            <p className="max-w-md text-slate-600 leading-relaxed dark:text-slate-400">
              A refined fashion atelier for premium wardrobe stories, delivering curated silhouettes and iconic elegance in every stitch.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Explore</h3>
            <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="transition hover:text-slate-950 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-slate-950 dark:hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-slate-950 dark:hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="transition hover:text-slate-950 dark:hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Contact</h3>
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Email</p>
                <a href="mailto:hello@lushstitches.com" className="block mt-2 transition hover:text-slate-950 dark:hover:text-white">
                  hello@lushstitches.com
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Phone</p>
                <a href="tel:+919876543210" className="block mt-2 transition hover:text-slate-950 dark:hover:text-white">
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Location</p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Mumbai, India</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-slate-100/80 p-6 shadow-xl shadow-slate-950/10 transition duration-500 dark:border-slate-700/70 dark:bg-slate-950/70 dark:shadow-none">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Newsletter</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Subscribe for exclusive drops, styling notes, and fashion alerts.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-700"
                />
                <button className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                  Subscribe
                  <Send size={16} className="ml-2" />
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">No spam. Only premium launches and curated styling stories.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200/80 pt-8 text-sm text-slate-500 transition duration-500 dark:border-slate-800 dark:text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 Lush Stitches. All rights reserved.</p>
          <p>Designed for refined fashion experiences.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
