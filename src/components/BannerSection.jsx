import { Link } from "react-router-dom"

function BannerSection() {
  return (
    <section className="bg-brand-bg py-20 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto flex flex-col items-center justify-between gap-8 rounded-[2rem] border border-brand-border bg-white px-8 py-12 shadow-premium sm:flex-row">
        <div className="max-w-2xl text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Limited time</p>
          <h2 className="mt-4 text-3xl font-semibold text-brand-charcoal sm:text-4xl">
            Flat 20% off select fashion edits
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-brand-muted">
            Refresh your wardrobe with effortless essentials, premium fabrics, and flawless seasonal styling.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-8 py-4 text-sm font-semibold text-brand-bg transition hover:bg-slate-950"
        >
          Shop the offer
        </Link>
      </div>
    </section>
  )
}

export default BannerSection