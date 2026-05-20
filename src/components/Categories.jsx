function Categories() {
  const categories = [
    "Hoodies",
    "T-Shirts",
    "Jackets",
    "Pants",
  ]

  return (
    <section className="bg-slate-100 px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Shop by category</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">Curated collections for every look</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-[2rem] bg-white p-10 text-center text-xl font-semibold text-slate-950 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories