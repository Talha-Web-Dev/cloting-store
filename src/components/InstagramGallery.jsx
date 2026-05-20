import products from "../data/products"

export default function InstagramGallery() {
  const items = products.slice(0, 8)

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Follow us</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">From the feed</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((it) => (
          <a key={it.id} href="#" className="group overflow-hidden rounded-xl relative block">
            <img src={it.image} alt={it.title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-sm text-white">@lushstitches</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
