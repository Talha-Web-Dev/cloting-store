import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import defaultProducts from "../data/products"
import { BarChart3, ShoppingBag, Users, DollarSign, Upload, Trash2, Plus, LayoutDashboard, ArrowUpRight, CircleDashed } from "lucide-react"
import toast from "react-hot-toast"

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  const getStored = () => {
    try {
      const raw = localStorage.getItem("products")
      return raw ? JSON.parse(raw) : defaultProducts
    } catch (e) {
      return defaultProducts
    }
  }

  const [products, setProducts] = useState(getStored)
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [imageData, setImageData] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const orders = [
    { id: "OD-1045", customer: "Neha Patel", total: 4599, status: "Delivered", date: "May 18" },
    { id: "OD-1044", customer: "Aarav Singh", total: 3299, status: "Processing", date: "May 17" },
    { id: "OD-1043", customer: "Isha Rao", total: 2199, status: "Shipped", date: "May 16" },
    { id: "OD-1042", customer: "Rahul Verma", total: 6899, status: "Delivered", date: "May 15" },
  ]

  const users = [
    { id: 1, name: "Priya Nair", email: "priya@lush.com", role: "Customer" },
    { id: 2, name: "Sameer Khan", email: "sameer@lush.com", role: "Customer" },
    { id: 3, name: "Meera Shah", email: "meera@lush.com", role: "Customer" },
    { id: 4, name: "Aditi Rao", email: "aditi@lush.com", role: "Customer" },
  ]

  const metrics = [
    { title: "Total sales", value: "₹128.5K", delta: "+18%", icon: DollarSign },
    { title: "Orders today", value: "142", delta: "+9%", icon: ShoppingBag },
    { title: "New customers", value: "58", delta: "+12%", icon: Users },
    { title: "Stock alerts", value: "7", delta: "-3%", icon: CircleDashed },
  ]

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = () => {
      setImageData(reader.result)
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!title || !price || !category) {
      toast.error("Please fill all fields")
      return
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      image: imageData || "https://via.placeholder.com/600x800?text=Product",
    }

    setProducts([newProduct, ...products])
    setTitle("")
    setPrice(0)
    setCategory("")
    setImageData(null)
    setShowModal(false)
    toast.success("Product added")
  }

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    toast.success("Product removed")
  }

  const navItems = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "products", label: "Products", icon: ShoppingBag },
    { key: "orders", label: "Orders", icon: DollarSign },
    { key: "users", label: "Customers", icon: Users },
  ]

  const statusBadge = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Shipped: "bg-blue-100 text-sky-700",
    Processing: "bg-amber-100 text-amber-700",
  }

  return (
    <section className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-slate-900/95 px-6 py-8 lg:w-[320px] lg:border-r lg:border-slate-800 lg:px-8 lg:py-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-slate-100 shadow-lg shadow-slate-950/30">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Lush Stitches</p>
              <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeSection === item.key
                      ? "bg-slate-800 text-white shadow-inner"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-950 p-5 shadow-lg shadow-slate-950/30">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Account</p>
            <p className="mt-4 text-lg font-semibold">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <button
              onClick={logout}
              className="mt-5 w-full rounded-full bg-slate-100/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-100/15"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Fashion operations overview</h1>
              <p className="mt-2 max-w-2xl text-slate-400">Monitor sales, manage products, orders, and customers from one premium interface.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <Plus size={16} /> Add product
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-800">
                <ArrowUpRight size={16} /> Export
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{metric.title}</p>
                      <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                    </div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-slate-100">
                      <Icon size={20} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">{metric.delta} vs last period</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Sales chart</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Weekly revenue</h2>
                </div>
                <p className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">+23% this week</p>
              </div>
              <div className="mt-8 space-y-5">
                {[
                  { label: "Mon", value: 45 },
                  { label: "Tue", value: 68 },
                  { label: "Wed", value: 52 },
                  { label: "Thu", value: 80 },
                  { label: "Fri", value: 74 },
                  { label: "Sat", value: 92 },
                  { label: "Sun", value: 65 },
                ].map((point) => (
                  <div key={point.label} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-slate-400">{point.label}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${point.value}%` }} />
                    </div>
                    <span className="w-12 text-right text-sm text-slate-300">{point.value}k</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Performance</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Conversion funnel</h2>
                </div>
                <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">3.8% uplift</span>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  { label: "Store visits", value: "12.3K", percent: "82%" },
                  { label: "Add to cart", value: "7.8K", percent: "63%" },
                  { label: "Checkout", value: "3.9K", percent: "31%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-950 px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-400">{item.label}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                      </div>
                      <p className="text-sm text-emerald-400">{item.percent}</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: item.percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order management</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Recent orders</h2>
                </div>
                <span className="text-sm text-slate-400">Showing 4 latest</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950">
                <table className="w-full border-collapse text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Order</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Total</th>
                      <th className="px-5 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t border-slate-800 hover:bg-slate-900/80">
                        <td className="px-5 py-4 text-white">{order.id}</td>
                        <td className="px-5 py-4">{order.customer}</td>
                        <td className="px-5 py-4">{order.date}</td>
                        <td className="px-5 py-4">₹{order.total}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">User management</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Active customers</h2>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {users.map((userItem) => (
                  <div key={userItem.id} className="rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
                    <p className="font-semibold text-white">{userItem.name}</p>
                    <p className="text-sm text-slate-400">{userItem.email}</p>
                    <span className="mt-2 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{userItem.role}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
          <div className="w-full max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">New product</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Add inventory item</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm text-slate-300">Product name</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
                  placeholder="Lush silk dress"
                />
                <label className="block text-sm text-slate-300">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
                  placeholder="Dresses"
                />
                <label className="block text-sm text-slate-300">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
                  placeholder="4999"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm text-slate-300">Product image</label>
                <label className="flex min-h-[140px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950 px-4 py-5 text-center text-slate-400 transition hover:border-emerald-500 hover:text-slate-200">
                  <div>
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-100">
                      <Upload size={18} />
                    </div>
                    <span>{imageData ? "Image selected" : "Click to upload or drag file"}</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {imageData && <img src={imageData} alt="preview" className="w-full rounded-3xl object-cover" />}
                <div className="flex items-center gap-3">
                  <button type="submit" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    Save product
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default AdminDashboard
