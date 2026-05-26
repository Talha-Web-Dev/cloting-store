import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"
import { CartContext } from "../context/CartContext"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import EmptyState from "../components/EmptyState"

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success("Added to cart")
  }

  const handleRemove = (productId) => {
    removeFromWishlist(productId)
    toast.success("Removed from wishlist")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 transition duration-500 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Saved Items
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              My Wishlist
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              {wishlist.length === 0
                ? "Your wishlist is empty. Start adding items!"
                : `You have ${wishlist.length} item${wishlist.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 dark:bg-white dark:text-slate-950"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your Wishlist Is Empty"
            text="Start saving your favorite items to see them here."
            buttonText="Explore Shop"
            onClick={() => (window.location.href = "/shop")}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative block h-64 overflow-hidden bg-slate-200 dark:bg-slate-700"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="block truncate text-sm font-semibold text-slate-900 transition hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300"
                  >
                    {product.title}
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through dark:text-slate-400">
                          Rs. {product.originalPrice}
                        </span>
                      )}
                      <p className="text-lg font-bold text-slate-950 dark:text-white">
                        Rs. {product.price}
                      </p>
                    </div>
                    {product.originalPrice && (
                      <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-300">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.round(product.rating)
                                ? "text-yellow-400"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        ({product.reviews})
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
