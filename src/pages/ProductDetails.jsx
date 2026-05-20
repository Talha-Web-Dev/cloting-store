import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import products from "../data/products"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import SkeletonCard from "../components/SkeletonCard"
import ProductCard from "../components/ProductCard"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)

  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(0)
  const [size, setSize] = useState("M")
  const [color, setColor] = useState("#111827")
  const [quantity, setQuantity] = useState(1)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imgRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(timer)
  }, [])

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Product not found.</h1>
        <p className="mt-4 text-slate-600">Please return to the shop and choose another item.</p>
      </section>
    )
  }

  const saved = isInWishlist(product.id)

  if (loading) {
    return (
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SkeletonCard />
        </div>
      </section>
    )
  }

  const gallery = [product.image, ...(product.gallery || [])]

  const onMouseMove = (e) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, selectedSize: size, selectedColor: color })
    }
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 6)

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-[1fr,120px]">
            <div
              className="relative overflow-hidden rounded-[1.25rem] bg-white shadow-xl"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={onMouseMove}
            >
              <img
                ref={imgRef}
                src={gallery[selected]}
                alt={product.title}
                className="h-[520px] w-full object-cover transition-transform duration-300 hover:scale-105"
              />

              {showZoom && (
                <div
                  className="pointer-events-none absolute right-5 top-5 hidden w-48 overflow-hidden rounded-lg border border-slate-200 bg-white md:block"
                  style={{ height: 200 }}
                >
                  <div
                    className="h-full w-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${gallery[selected]})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: "200%",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="hidden gap-3 overflow-hidden md:flex flex-col">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`overflow-hidden rounded-xl border ${selected === idx ? "border-slate-900" : "border-slate-200"}`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">{product.title}</h1>
              <p className="mt-4 text-3xl font-semibold text-slate-900">Rs. {product.price}</p>
            </div>

            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">Size</label>
                <div className="flex flex-wrap gap-3">
                  {['XS','S','M','L','XL'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-md border px-4 py-2 text-sm ${size === s ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">Color</label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: '#111827', name: 'Black' },
                    { hex: '#F5F5F4', name: 'Beige' },
                    { hex: '#FFFFFF', name: 'White' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`h-8 w-8 rounded-full ring-offset-2 transition ${color === c.hex ? 'ring-2 ring-slate-900' : 'ring-0'}`}
                      style={{ background: c.hex }}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-md border px-3 py-2">-</button>
                  <div className="min-w-[44px] text-center text-lg font-medium">{quantity}</div>
                  <button onClick={() => setQuantity(quantity + 1)} className="rounded-md border px-3 py-2">+</button>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleAdd} className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Add to Cart</button>
                  <button onClick={() => toggleWishlist(product)} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">{saved ? 'Saved' : 'Save'}</button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600">{product.description || 'Premium material and refined details for everyday wear.'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Customer reviews</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { id: 1, name: 'Aisha', rating: 5, text: 'Amazing fit and fabric — absolutely love it.' },
                    { id: 2, name: 'Rohan', rating: 4, text: 'Great quality, true to size.' },
                  ].map((r) => (
                    <div key={r.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-sm text-slate-500">{Array.from({ length: r.rating }).map((_, i) => '★').join('')}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-slate-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Related products</h3>
                <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto pb-4">
                  {related.map((rp) => (
                    <div key={rp.id} className="w-[260px] flex-shrink-0">
                      <ProductCard product={rp} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="text-sm font-medium text-slate-600 underline transition hover:text-slate-900"
            >
              Back to shop
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;
