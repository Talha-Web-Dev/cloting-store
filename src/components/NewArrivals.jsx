import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import products from "../data/products"
import ProductCard from "./ProductCard"

export default function NewArrivals() {
  const ref = useRef(null)

  const scroll = (dir = "right") => {
    if (!ref.current) return
    const el = ref.current
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 transition duration-500 dark:text-slate-100">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">New Arrivals</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Discover what's new this season</h2>
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="prev" onClick={() => scroll("left")} className="rounded-full bg-white p-2 shadow transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800">
            <ChevronLeft size={18} />
          </button>
          <button aria-label="next" onClick={() => scroll("right")} className="rounded-full bg-white p-2 shadow transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar flex gap-6 overflow-x-auto pb-3">
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="w-[320px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
