import { Heart, ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)
  const isFavorite = isInWishlist(product.id)

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700/70 dark:bg-slate-950/90"
    >
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${
          isFavorite ? "text-red-500" : "hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-cover"
        />
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <Link to={`/product/${product.id}`} className="block">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{product.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{product.title}</h2>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Rs. {product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-sm transition duration-300 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard;
