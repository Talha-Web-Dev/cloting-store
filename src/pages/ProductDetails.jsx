import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import toast from "react-hot-toast"
import products from "../data/products"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import ProductCard from "../components/ProductCard"
import SkeletonCard from "../components/SkeletonCard"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)

  const product = products.find((item) => item.id === Number(id))
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(0)
  const [size, setSize] = useState("M")
  const [color, setColor] = useState("#111827")
  const [quantity, setQuantity] = useState(1)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [recent, setRecent] = useState([])
  const imgRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(timer)
  }, [id])

  useEffect(() => {
    setSelected(0)
    setQuantity(1)
  }, [id])

  useEffect(() => {
    if (!product || typeof window === "undefined") return
    try {
      const key = "lush-recent"
      const raw = JSON.parse(window.localStorage.getItem(key) || "[]")
      const next = [product.id, ...raw.filter((itemId) => itemId !== product.id)].slice(0, 8)
      window.localStorage.setItem(key, JSON.stringify(next))
      setRecent(products.filter((item) => next.includes(item.id) && item.id !== product.id))
    } catch {
      setRecent([])
    }
  }, [product])

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Product not found.</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Please return to the shop and choose another item.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
          Back to shop
        </Link>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="bg-slate-100 py-16 transition duration-500 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SkeletonCard />
        </div>
      </section>
    )
  }

  const gallery = [product.image, ...(product.gallery || product.images || [])]
  const saved = isInWishlist(product.id)
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
  const discountedPrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

  const onMouseMove = (event) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    setZoomPos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleAdd = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({ ...product, selectedSize: size, selectedColor: color })
    }
  }

  const handleAddWithToast = () => {
    handleAdd()
    toast.success("Added to cart")
  }

  const handleBuyNow = () => {
    handleAdd()
    toast.success("Proceeding to checkout")
    navigate("/checkout")
  }

  return (
    <section className="bg-slate-100 text-slate-950 transition duration-500 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <nav className="mb-6 text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li>/</li>
            <li className="text-slate-800 dark:text-slate-200">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-4 md:grid-cols-[1fr_96px]">
            <div
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950/80"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[selected]}
                  ref={imgRef}
                  src={gallery[selected]}
                  alt={product.title}
                  onMouseMove={onMouseMove}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="h-[420px] w-full object-cover sm:h-[560px]"
                />
              </AnimatePresence>

              {product.originalPrice ? (
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-950 shadow-sm">
                  Save Rs. {product.originalPrice - product.price}
                </span>
              ) : null}

              {showZoom ? (
                <div className="pointer-events-none absolute right-5 top-5 hidden h-56 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl md:block dark:border-slate-700 dark:bg-slate-900">
                  <div
                    className="h-full w-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${gallery[selected]})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: "220%",
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelected(index)}
                  aria-label={`Select image ${index + 1}`}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition md:h-24 md:w-24 ${selected === index ? "border-slate-950 ring-2 ring-slate-950/20 dark:border-white" : "border-slate-200 dark:border-slate-700"}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{product.category}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{product.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={`h-5 w-5 ${index < Math.round(product.rating || 4) ? "fill-current" : "text-slate-300 dark:text-slate-700"}`} />
                  ))}
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({product.reviews || 24} reviews)</span>
                </div>
                <p className="text-3xl font-semibold text-slate-950 dark:text-white">Rs. {discountedPrice}</p>
                {product.originalPrice ? <span className="text-sm text-slate-500 line-through">Rs. {product.originalPrice}</span> : null}
              </div>
              <p className="text-slate-600 dark:text-slate-400">{product.description}</p>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-600 dark:text-slate-400">Size</label>
                  <div className="flex flex-wrap gap-3">
                    {(product.sizes || ["S", "M", "L", "XL"]).map((itemSize) => (
                      <button
                        key={itemSize}
                        onClick={() => setSize(itemSize)}
                        className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-semibold transition ${size === itemSize ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950" : "border-slate-200 bg-white text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"}`}
                      >
                        {itemSize}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-3 block text-sm font-medium text-slate-600 dark:text-slate-400">Color</label>
                  <div className="flex items-center gap-3">
                    {[
                      { hex: "#111827", name: "Black" },
                      { hex: "#f5f5f4", name: "Stone" },
                      { hex: "#92400e", name: "Cognac" },
                    ].map((itemColor) => (
                      <button
                        key={itemColor.hex}
                        onClick={() => setColor(itemColor.hex)}
                        aria-label={itemColor.name}
                        className={`h-10 w-10 rounded-full border ring-offset-2 transition ${color === itemColor.hex ? "ring-2 ring-slate-950 dark:ring-white" : ""}`}
                        style={{ background: itemColor.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-12 items-center justify-between rounded-full border border-slate-200 bg-white px-2 dark:border-slate-700 dark:bg-slate-900">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Decrease quantity"><Minus size={16} /></button>
                    <span className="w-10 text-center font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Increase quantity"><Plus size={16} /></button>
                  </div>
                  <button onClick={handleAddWithToast} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
                    <ShoppingCart size={18} /> Add to cart
                  </button>
                  <button onClick={() => { toggleWishlist(product); toast.success(saved ? "Removed from wishlist" : "Saved to wishlist") }} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" aria-label="Toggle wishlist">
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>

                <button onClick={handleBuyNow} className="mt-3 w-full rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                  Buy now
                </button>
              </div>

              <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400 sm:grid-cols-3">
                <p><span className="block font-semibold text-slate-950 dark:text-white">In stock</span>{product.inStock === false ? "Limited restock soon" : "Ready to ship"}</p>
                <p><span className="block font-semibold text-slate-950 dark:text-white">Delivery</span>3-5 business days</p>
                <p><span className="block font-semibold text-slate-950 dark:text-white">Returns</span>14 day free returns</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/70">
            <h2 className="text-xl font-semibold">Product details</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-400">{product.details || product.description}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950/70">
            <h2 className="text-xl font-semibold">Customer reviews</h2>
            <div className="mt-4 space-y-4">
              {[
                { name: "Aisha", text: "Amazing fit and fabric. It looks polished without feeling precious." },
                { name: "Rohan", text: "Great quality, true to size, and the packaging felt premium." },
              ].map((review) => (
                <div key={review.name} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="font-semibold">{review.name}</p>
                  <div className="mt-1 flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Related products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 4)).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        {recent.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Recently viewed</h2>
            <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-4">
              {recent.map((item) => (
                <div key={item.id} className="w-[260px] flex-shrink-0">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  )
}

export default ProductDetails
