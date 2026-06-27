import products from "../data/products"
import ProductCard from "./ProductCard"

export default function BestSellers() {
  return (
    <section className="bg-brand-bg py-24 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Best Sellers</p>
          <h2 className="mt-3 text-4xl font-semibold text-brand-charcoal">Our most loved styles</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            Discover the standout pieces customers return to again and again.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(2, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
