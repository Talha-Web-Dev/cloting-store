import { Mail, Sparkles, ShieldCheck, Phone } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border text-brand-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-charcoal text-brand-bg font-bold">
                LS
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Lush & Stitches</p>
                <p className="mt-2 text-base font-semibold text-brand-charcoal">Modern elevated wardrobe</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-brand-muted">
              Premium clothing with refined silhouettes, thoughtful fit, and everyday ease.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Quick Links</p>
            <ul className="mt-6 space-y-3 text-sm text-brand-muted">
              <li>
                <a href="/shop" className="transition hover:text-brand-charcoal">
                  Shop
                </a>
              </li>
              <li>
                <a href="/wishlist" className="transition hover:text-brand-charcoal">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/profile" className="transition hover:text-brand-charcoal">
                  My Account
                </a>
              </li>
              <li>
                <a href="/contact" className="transition hover:text-brand-charcoal">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Contact</p>
            <ul className="mt-6 space-y-3 text-sm text-brand-muted">
              <li>
                <a href="mailto:hello@lushstitches.com" className="transition hover:text-brand-charcoal">
                  hello@lushstitches.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="transition hover:text-brand-charcoal">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>Support hours 9am–6pm</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Stay Connected</p>
            <div className="mt-6 grid gap-4">
              <div className="flex items-start gap-3 rounded-[1.5rem] border border-brand-border bg-white/90 p-4 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-charcoal text-brand-bg">
                  <Sparkles size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">Exclusive drops</p>
                  <p className="text-sm text-brand-muted">Be first to see new arrivals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1.5rem] border border-brand-border bg-white/90 p-4 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-charcoal text-brand-bg">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">Secure checkout</p>
                  <p className="text-sm text-brand-muted">Safe and trusted payment flow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-border pt-8 text-sm text-brand-muted">
          © 2026 Lush & Stitches. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
