import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import products from "../data/products"
import SkeletonCard from "../components/SkeletonCard"

function Shop() {

  // Search State
  const [search, setSearch] = useState("")

  // Category State
  const [category, setCategory] = useState("All")

  // Categories Array
  const categories = [
    "All",
    "Hoodies",
    "T-Shirts",
    "Jackets",
    "Pants",
  ]

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => (category === "All" ? true : product.category === category))

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Lush Stitches Shop</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Discover premium fashion essentials.
            </h1>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 md:w-80"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                category === cat
                  ? "bg-slate-950 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-14 text-center text-slate-600 shadow-sm">
            No products matched your search.
          </div>
        )}
      </div>
    </section>
  )
}

export default Shop