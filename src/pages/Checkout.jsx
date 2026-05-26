import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import toast from "react-hot-toast"

function Checkout() {
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    phone: "",
  })

  const [billingSame, setBillingSame] = useState(true)
  const [billing, setBilling] = useState({ name: "", address: "", city: "", state: "", zip: "" })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" })
  const [promo, setPromo] = useState("")

  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0)
  const shippingCost = subtotal > 5000 ? 0 : 99
  const discount = promo.trim().toUpperCase() === "LUSH10" ? subtotal * 0.1 : 0
  const total = Math.max(0, subtotal - discount + shippingCost)

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value })
  const handleBillingChange = (e) => setBilling({ ...billing, [e.target.name]: e.target.value })
  const handleCardChange = (e) => setCard({ ...card, [e.target.name]: e.target.value })

  const placeOrder = (e) => {
    e.preventDefault()
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.zip) {
      toast.error("Please complete shipping details")
      return
    }

    if (paymentMethod === "card" && (!card.number || !card.name || !card.exp || !card.cvv)) {
      toast.error("Please enter card details")
      return
    }

    toast.success("Order placed — demo")
    navigate("/profile")
  }

  return (
    <div className="bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-slate-100 min-h-screen py-16 transition duration-500">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

        <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 dark:bg-slate-950/85 dark:border dark:border-slate-700">
              <h2 className="text-lg font-semibold">1. Shipping information</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input name="name" value={shipping.name} onChange={handleChange} placeholder="Full name" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="email" value={shipping.email} onChange={handleChange} placeholder="Email" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="address" value={shipping.address} onChange={handleChange} placeholder="Street address" className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="city" value={shipping.city} onChange={handleChange} placeholder="City" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="state" value={shipping.state} onChange={handleChange} placeholder="State" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="zip" value={shipping.zip} onChange={handleChange} placeholder="Postal code" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <input name="phone" value={shipping.phone} onChange={handleChange} placeholder="Phone" className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 dark:bg-slate-950/85 dark:border dark:border-slate-700">
              <h2 className="text-lg font-semibold">2. Billing information</h2>
              <div className="mt-3 flex items-center gap-3">
                <input id="same" type="checkbox" checked={billingSame} onChange={() => setBillingSame(!billingSame)} className="h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-700 dark:bg-slate-900/70" />
                <label htmlFor="same" className="text-sm text-slate-600 dark:text-slate-400">Billing same as shipping</label>
              </div>

              {!billingSame && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input name="name" value={billing.name} onChange={handleBillingChange} placeholder="Name on bill" className="rounded-md border px-4 py-3" />
                  <input name="address" value={billing.address} onChange={handleBillingChange} placeholder="Billing address" className="sm:col-span-2 rounded-md border px-4 py-3" />
                  <input name="city" value={billing.city} onChange={handleBillingChange} placeholder="City" className="rounded-md border px-4 py-3" />
                  <input name="zip" value={billing.zip} onChange={handleBillingChange} placeholder="Postal code" className="rounded-md border px-4 py-3" />
                </div>
              )}
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 dark:bg-slate-950/85 dark:border dark:border-slate-700">
              <h2 className="text-lg font-semibold">3. Payment methods</h2>

              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-slate-900 dark:text-slate-100" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Credit / Debit card</span>
                </label>

                {paymentMethod === 'card' && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input name="number" value={card.number} onChange={handleCardChange} placeholder="Card number" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none sm:col-span-2 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                    <input name="name" value={card.name} onChange={handleCardChange} placeholder="Name on card" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                    <input name="exp" value={card.exp} onChange={handleCardChange} placeholder="MM/YY" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                    <input name="cvv" value={card.cvv} onChange={handleCardChange} placeholder="CVV" className="rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                  </div>
                )}

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span className="text-sm">Cash on delivery</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
                  <span className="text-sm">Stripe (demo)</span>
                </label>

                {paymentMethod === 'stripe' && (
                  <div className="mt-3">
                    <button type="button" className="rounded-md bg-slate-900 px-4 py-2 text-white">Connect with Stripe (demo)</button>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 dark:border-slate-700 dark:bg-slate-950/85">
            <h3 className="text-lg font-semibold">Order summary</h3>

            <div className="mt-4 space-y-4">
              {cart.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.image} alt={it.title} className="h-16 w-16 rounded-md object-cover" />
                  <div>
                    <p className="text-sm font-medium">{it.title}</p>
                    <p className="text-sm text-slate-500">Qty: {it.quantity} {it.selectedSize ? ` • Size ${it.selectedSize}` : ''}</p>
                  </div>
                  <div className="ml-auto font-medium">Rs. {it.price * it.quantity}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
                <span>Discount</span>
                <span>Rs. {Math.round(discount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
                <span>Shipping</span>
                <span>Rs. {shippingCost}</span>
              </div>

                <div className="mt-4 flex items-center gap-3">
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100" />
                <button type="button" onClick={() => toast.success('Promo applied (demo)')} className="rounded-md bg-slate-950 px-4 py-2 text-white dark:bg-white dark:text-slate-950">Apply</button>
              </div>

                <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                  <p className="text-2xl font-semibold text-slate-950 dark:text-white">Rs. {total}</p>
                </div>
                <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-white dark:bg-white dark:text-slate-950">Place order</button>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
