import { Truck, ShieldCheck, Repeat, Sparkles } from "lucide-react"

const reasons = [
  {
    title: "Free Shipping",
    description: "Complimentary delivery on orders above Rs. 8,000.",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description: "Encrypted checkout for safe payments every time.",
    icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 14 days of delivery.",
    icon: Repeat,
  },
  {
    title: "Premium Quality",
    description: "Beautiful fabrics, expert tailoring, timeless finishes.",
    icon: Sparkles,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-bg py-24 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Why Choose Us</p>
          <h2 className="mt-3 text-4xl font-semibold text-brand-charcoal">Designed to feel premium, look effortless.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            Experience fashion with thoughtful service, quality craftsmanship, and timeless comfort.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-[2rem] border border-brand-border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-charcoal text-brand-bg">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
