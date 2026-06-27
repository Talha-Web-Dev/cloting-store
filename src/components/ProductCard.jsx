import { Heart, ShoppingBag, Star } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)
  const isFavorite = isInWishlist(product.id)
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {discount > 0 && (
          <div className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-charcoal shadow-lg shadow-brand-gold/30">
            -{discount}%
          </div>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/95 text-brand-charcoal shadow-sm transition hover:bg-brand-bg ${
            isFavorite ? "text-brand-gold" : "text-brand-muted"
          }`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-muted">{product.category}</p>
        <h2 className="mt-3 text-xl font-semibold text-brand-charcoal">{product.title}</h2>

        <div className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < Math.round(product.rating || 0) ? "text-brand-gold" : "text-brand-border"}`}
            />
          ))}
          <span className="font-medium text-brand-muted">{(product.rating || 0).toFixed(1)} · {product.reviews}</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div>
            <p className="text-lg font-semibold text-brand-charcoal">Rs. {product.price}</p>
            {product.originalPrice > product.price && (
              <p className="text-sm text-brand-muted line-through">Rs. {product.originalPrice}</p>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-brand-charcoal px-4 py-3 text-sm font-semibold text-brand-bg transition hover:bg-slate-950"
          >
            <ShoppingBag size={18} />
            Add to bag
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
