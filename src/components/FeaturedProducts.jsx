import products from "../data/products"
import ProductCard from "./ProductCard"

export default function FeaturedProducts() {
  return (
    <section className="bg-brand-bg py-24 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Featured products</p>
            <h2 className="mt-3 text-4xl font-semibold text-brand-charcoal">Curated wardrobe essentials</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-brand-muted">
            Explore a premium selection of pieces designed for refined everyday dressing.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
