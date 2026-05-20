import EmptyState from "../components/EmptyState"
import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const navigate = useNavigate()

  const [code, setCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCode, setAppliedCode] = useState("")

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 || appliedCode === "FREESHIP" ? 0 : 99
  const discountAmount = (subtotal * discount) / 100
  const totalPrice = Math.max(0, subtotal - discountAmount + shipping)

  const applyCode = () => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) return

    if (normalized === "LUSH10") {
      setDiscount(10)
      setAppliedCode(normalized)
      toast.success("Coupon applied — 10% off")
      return
    }

    if (normalized === "FREESHIP") {
      setDiscount(0)
      setAppliedCode(normalized)
      toast.success("Free shipping applied")
      return
    }

    toast.error("Invalid code")
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    toast.success("Proceeding to checkout — demo")
    navigate("/checkout")
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-semibold mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <EmptyState
            title="Your Cart Is Empty"
            text="Looks like you haven’t added any products yet."
            buttonText="Continue Shopping"
            onClick={() => (window.location.href = "/shop")}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="h-28 w-28 rounded-lg object-cover" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">Rs. {item.price}</p>

                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                          {item.selectedSize && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Size:</span>
                              <span className="font-medium">{item.selectedSize}</span>
                            </div>
                          )}

                          {item.selectedColor && (
                            <div className="flex items-center gap-2">
                              <span className="inline-block h-4 w-4 rounded-full border" style={{ background: item.selectedColor }} />
                              <span className="text-sm">{item.selectedColor}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                        <button onClick={() => decreaseQuantity(item.id)} className="rounded-md border px-3 py-1">-</button>
                        <div className="min-w-[36px] text-center font-medium">{item.quantity}</div>
                        <button onClick={() => increaseQuantity(item.id)} className="rounded-md border px-3 py-1">+</button>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">Subtotal: Rs. {item.price * item.quantity}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 md:mt-0">
                    <button onClick={() => removeFromCart(item.id)} className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Order Summary</h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Discount</span>
                  <span>- Rs. {Math.round(discountAmount)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>Rs. {shipping}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" className="w-full rounded-md border px-4 py-2" />
                <button onClick={applyCode} className="rounded-md bg-slate-900 px-4 py-2 text-white">Apply</button>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-2xl font-semibold">Rs. {totalPrice}</p>
                </div>
                <button onClick={handleCheckout} className="rounded-full bg-slate-900 px-6 py-3 text-white">Checkout</button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
