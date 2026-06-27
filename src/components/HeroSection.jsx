import { Link } from "react-router-dom"
import heroImage from "../assets/heroImage.jpg"

function HeroSection() {
  return (
    <section className="bg-brand-bg text-brand-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-border bg-white/80 px-4 py-2 text-sm uppercase tracking-[0.35em] text-brand-charcoal shadow-sm">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-charcoal text-sm font-semibold text-brand-bg">LS</span>
            Lush & Stitches
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-brand-charcoal sm:text-6xl lg:text-7xl">
              Editorial luxury, refined for everyday style.
            </h1>
            <p className="max-w-xl text-lg leading-9 text-brand-muted">
              Discover modern fashion essentials shaped by premium fabric, refined detail, and a calm, elegant aesthetic.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-10 py-4 text-sm font-semibold text-brand-bg transition hover:bg-slate-950"
            >
              Shop Collection
            </Link>
            <span className="text-sm text-brand-muted">Free shipping on orders over Rs. 8,000</span>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="relative overflow-hidden rounded-[32px] border border-brand-border bg-brand-bg shadow-premium">
            <img
              src={heroImage}
              alt="Fashion models in modern apparel"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent p-8">
              <p className="max-w-md text-sm uppercase tracking-[0.35em] text-brand-bg">New season edit</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-bg">Timeless pieces with quiet luxury.</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
