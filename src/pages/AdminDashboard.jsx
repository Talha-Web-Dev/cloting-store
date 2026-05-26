// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../context/AuthContext"
// import defaultProducts from "../data/products"
// import { BarChart3, ShoppingBag, Users, DollarSign, Upload, Trash2, Plus, LayoutDashboard, ArrowUpRight, CircleDashed } from "lucide-react"
// import toast from "react-hot-toast"

// function AdminDashboard() {
//   const { user, logout } = useContext(AuthContext)
//   const [showModal, setShowModal] = useState(false)
//   const [activeSection, setActiveSection] = useState("dashboard")

//   const getStored = () => {
//     try {
//       const raw = localStorage.getItem("products")
//       return raw ? JSON.parse(raw) : defaultProducts
//     } catch {
//       return defaultProducts
//     }
//   }

//   const [products, setProducts] = useState(getStored)
//   const [title, setTitle] = useState("")
//   const [price, setPrice] = useState(0)
//   const [category, setCategory] = useState("")
//   const [imageData, setImageData] = useState(null)
//   const [isUploading, setIsUploading] = useState(false)

//   const orders = [
//     { id: "OD-1045", customer: "Neha Patel", total: 4599, status: "Delivered", date: "May 18" },
//     { id: "OD-1044", customer: "Aarav Singh", total: 3299, status: "Processing", date: "May 17" },
//     { id: "OD-1043", customer: "Isha Rao", total: 2199, status: "Shipped", date: "May 16" },
//     { id: "OD-1042", customer: "Rahul Verma", total: 6899, status: "Delivered", date: "May 15" },
//   ]

//   const users = [
//     { id: 1, name: "Priya Nair", email: "priya@lush.com", role: "Customer" },
//     { id: 2, name: "Sameer Khan", email: "sameer@lush.com", role: "Customer" },
//     { id: 3, name: "Meera Shah", email: "meera@lush.com", role: "Customer" },
//     { id: 4, name: "Aditi Rao", email: "aditi@lush.com", role: "Customer" },
//   ]

//   const metrics = [
//     { title: "Total sales", value: "Rs. 128.5K", delta: "+18%", icon: DollarSign },
//     { title: "Orders today", value: "142", delta: "+9%", icon: ShoppingBag },
//     { title: "New customers", value: "58", delta: "+12%", icon: Users },
//     { title: "Stock alerts", value: "7", delta: "-3%", icon: CircleDashed },
//   ]

//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products))
//   }, [products])

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]
//     if (!file) return

//     setIsUploading(true)
//     const reader = new FileReader()
//     reader.onload = () => {
//       setImageData(reader.result)
//       setIsUploading(false)
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleAddProduct = (e) => {
//     e.preventDefault()
//     if (!title || !price || !category) {
//       toast.error("Please fill all fields")
//       return
//     }

//     const newProduct = {
//       id: Date.now(),
//       title,
//       price: Number(price),
//       category,
//       image: imageData || "https://via.placeholder.com/600x800?text=Product",
//     }

//     setProducts([newProduct, ...products])
//     setTitle("")
//     setPrice(0)
//     setCategory("")
//     setImageData(null)
//     setShowModal(false)
//     toast.success("Product added")
//   }

//   const handleDelete = (id) => {
//     setProducts(products.filter((p) => p.id !== id))
//     toast.success("Product removed")
//   }

//   const navItems = [
//     { key: "dashboard", label: "Overview", icon: LayoutDashboard },
//     { key: "analytics", label: "Analytics", icon: BarChart3 },
//     { key: "products", label: "Products", icon: ShoppingBag },
//     { key: "orders", label: "Orders", icon: DollarSign },
//     { key: "users", label: "Customers", icon: Users },
//   ]

//   const statusBadge = {
//     Delivered: "bg-emerald-100 text-emerald-700",
//     Shipped: "bg-blue-100 text-sky-700",
//     Processing: "bg-amber-100 text-amber-700",
//   }

//   return (
//     <section className="min-h-screen bg-slate-950 text-slate-100">
//       <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
//         <aside className="w-full border-b border-slate-800 bg-slate-900/95 px-6 py-8 lg:w-[320px] lg:border-r lg:border-slate-800 lg:px-8 lg:py-10">
//           <div className="flex items-center gap-3">
//             <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-slate-100 shadow-lg shadow-slate-950/30">
//               <ShoppingBag size={24} />
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Lush Stitches</p>
//               <h2 className="text-2xl font-semibold">Admin Panel</h2>
//             </div>
//           </div>

//           <nav className="mt-10 space-y-2">
//             {navItems.map((item) => {
//               const Icon = item.icon
//               return (
//                 <button
//                   key={item.key}
//                   onClick={() => setActiveSection(item.key)}
//                   className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
//                     activeSection === item.key
//                       ? "bg-slate-800 text-white shadow-inner"
//                       : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {item.label}
//                 </button>
//               )
//             })}
//           </nav>

//           <div className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-950 p-5 shadow-lg shadow-slate-950/30">
//             <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Account</p>
//             <p className="mt-4 text-lg font-semibold">{user?.name}</p>
//             <p className="text-sm text-slate-500">{user?.email}</p>
//             <button
//               onClick={logout}
//               className="mt-5 w-full rounded-full bg-slate-100/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-100/15"
//             >
//               Sign out
//             </button>
//           </div>
//         </aside>

//         <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Dashboard</p>
//               <h1 className="mt-3 text-4xl font-semibold text-white">Fashion operations overview</h1>
//               <p className="mt-2 max-w-2xl text-slate-400">Monitor sales, manage products, orders, and customers from one premium interface.</p>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
//               >
//                 <Plus size={16} /> Add product
//               </button>
//               <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-800">
//                 <ArrowUpRight size={16} /> Export
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 grid gap-6 xl:grid-cols-4">
//             {metrics.map((metric) => {
//               const Icon = metric.icon
//               return (
//                 <div key={metric.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{metric.title}</p>
//                       <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
//                     </div>
//                     <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-slate-100">
//                       <Icon size={20} />
//                     </div>
//                   </div>
//                   <p className="mt-4 text-sm text-slate-400">{metric.delta} vs last period</p>
//                 </div>
//               )
//             })}
//           </div>

//           <section className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Product management</p>
//                 <h2 className="mt-2 text-2xl font-semibold text-white">Inventory catalog</h2>
//               </div>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
//               >
//                 <Plus size={16} /> Add product
//               </button>
//             </div>
//             <div className="mt-6 overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-950">
//               <table className="w-full min-w-[760px] border-collapse text-left text-sm text-slate-300">
//                 <thead className="bg-slate-900 text-slate-400">
//                   <tr>
//                     <th className="px-5 py-4">Product</th>
//                     <th className="px-5 py-4">Category</th>
//                     <th className="px-5 py-4">Price</th>
//                     <th className="px-5 py-4">Rating</th>
//                     <th className="px-5 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.slice(0, 6).map((product) => (
//                     <tr key={product.id} className="border-t border-slate-800 hover:bg-slate-900/80">
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <img src={product.image} alt={product.title} className="h-12 w-12 rounded-xl object-cover" />
//                           <span className="font-medium text-white">{product.title}</span>
//                         </div>
//                       </td>
//                       <td className="px-5 py-4">{product.category}</td>
//                       <td className="px-5 py-4">Rs. {product.price}</td>
//                       <td className="px-5 py-4">{product.rating || "New"}</td>
//                       <td className="px-5 py-4 text-right">
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 text-red-300 transition hover:bg-red-500/10"
//                           aria-label={`Delete ${product.title}`}
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
//             <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
//               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Sales chart</p>
//                   <h2 className="mt-2 text-2xl font-semibold text-white">Weekly revenue</h2>
//                 </div>
//                 <p className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">+23% this week</p>
//               </div>
//               <div className="mt-8 space-y-5">
//                 {[
//                   { label: "Mon", value: 45 },
//                   { label: "Tue", value: 68 },
//                   { label: "Wed", value: 52 },
//                   { label: "Thu", value: 80 },
//                   { label: "Fri", value: 74 },
//                   { label: "Sat", value: 92 },
//                   { label: "Sun", value: 65 },
//                 ].map((point) => (
//                   <div key={point.label} className="flex items-center gap-4">
//                     <span className="w-12 text-sm text-slate-400">{point.label}</span>
//                     <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
//                       <div className="h-full rounded-full bg-emerald-500" style={{ width: `${point.value}%` }} />
//                     </div>
//                     <span className="w-12 text-right text-sm text-slate-300">{point.value}k</span>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Performance</p>
//                   <h2 className="mt-2 text-2xl font-semibold text-white">Conversion funnel</h2>
//                 </div>
//                 <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">3.8% uplift</span>
//               </div>
//               <div className="mt-8 space-y-4">
//                 {[
//                   { label: "Store visits", value: "12.3K", percent: "82%" },
//                   { label: "Add to cart", value: "7.8K", percent: "63%" },
//                   { label: "Checkout", value: "3.9K", percent: "31%" },
//                 ].map((item) => (
//                   <div key={item.label} className="rounded-3xl bg-slate-950 px-4 py-4">
//                     <div className="flex items-center justify-between gap-4">
//                       <div>
//                         <p className="text-sm text-slate-400">{item.label}</p>
//                         <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
//                       </div>
//                       <p className="text-sm text-emerald-400">{item.percent}</p>
//                     </div>
//                     <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
//                       <div className="h-full rounded-full bg-emerald-500" style={{ width: item.percent }} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           <div className="mt-8 grid gap-6 xl:grid-cols-3">
//             <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm xl:col-span-2">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order management</p>
//                   <h2 className="mt-2 text-2xl font-semibold text-white">Recent orders</h2>
//                 </div>
//                 <span className="text-sm text-slate-400">Showing 4 latest</span>
//               </div>
//               <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950">
//                 <table className="w-full border-collapse text-left text-sm text-slate-300">
//                   <thead className="bg-slate-900 text-slate-400">
//                     <tr>
//                       <th className="px-5 py-4">Order</th>
//                       <th className="px-5 py-4">Customer</th>
//                       <th className="px-5 py-4">Date</th>
//                       <th className="px-5 py-4">Total</th>
//                       <th className="px-5 py-4">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order.id} className="border-t border-slate-800 hover:bg-slate-900/80">
//                         <td className="px-5 py-4 text-white">{order.id}</td>
//                         <td className="px-5 py-4">{order.customer}</td>
//                         <td className="px-5 py-4">{order.date}</td>
//                         <td className="px-5 py-4">₹{order.total}</td>
//                         <td className="px-5 py-4">
//                           <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[order.status]}`}>
//                             {order.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>

//             <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm uppercase tracking-[0.3em] text-slate-500">User management</p>
//                   <h2 className="mt-2 text-2xl font-semibold text-white">Active customers</h2>
//                 </div>
//               </div>
//               <div className="mt-6 space-y-4">
//                 {users.map((userItem) => (
//                   <div key={userItem.id} className="rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
//                     <p className="font-semibold text-white">{userItem.name}</p>
//                     <p className="text-sm text-slate-400">{userItem.email}</p>
//                     <span className="mt-2 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{userItem.role}</span>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </main>
//       </div>

//       {showModal ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
//           <div className="w-full max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
//             <div className="flex items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm uppercase tracking-[0.3em] text-slate-500">New product</p>
//                 <h2 className="mt-2 text-3xl font-semibold text-white">Add inventory item</h2>
//               </div>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
//               >
//                 Close
//               </button>
//             </div>
//             <form onSubmit={handleAddProduct} className="mt-8 grid gap-6 md:grid-cols-2">
//               <div className="space-y-4">
//                 <label className="block text-sm text-slate-300">Product name</label>
//                 <input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
//                   placeholder="Lush silk dress"
//                 />
//                 <label className="block text-sm text-slate-300">Category</label>
//                 <input
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
//                   placeholder="Dresses"
//                 />
//                 <label className="block text-sm text-slate-300">Price</label>
//                 <input
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500"
//                   placeholder="4999"
//                 />
//               </div>
//               <div className="space-y-4">
//                 <label className="block text-sm text-slate-300">Product image</label>
//                 <label className="flex min-h-[140px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950 px-4 py-5 text-center text-slate-400 transition hover:border-emerald-500 hover:text-slate-200">
//                   <div>
//                     <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-100">
//                       <Upload size={18} />
//                     </div>
//                     <span>{isUploading ? "Reading image..." : imageData ? "Image selected" : "Click to upload or drag file"}</span>
//                   </div>
//                   <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//                 </label>
//                 {imageData && <img src={imageData} alt="preview" className="w-full rounded-3xl object-cover" />}
//                 <div className="flex items-center gap-3">
//                   <button type="submit" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
//                     Save product
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : null}
//     </section>
//   )
// }

// export default AdminDashboard





import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart2, Settings, TrendingUp, TrendingDown, Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import products from '../data/products';

const stats = [
  { label: 'Total Revenue', value: '$124,580', change: '+12.5%', up: true, icon: BarChart2 },
  { label: 'Orders', value: '1,247', change: '+8.2%', up: true, icon: ShoppingBag },
  { label: 'Products', value: '89', change: '+3', up: true, icon: Package },
  { label: 'Customers', value: '4,321', change: '+22.1%', up: true, icon: Users },
];

const recentOrders = [
  { id: 'LS-2024-0099', customer: 'Alexandra Chen', product: 'Silk Evening Gown', amount: 890, status: 'Delivered' },
  { id: 'LS-2024-0098', customer: 'James Whitmore', product: 'Wool Overcoat', amount: 1240, status: 'Processing' },
  { id: 'LS-2024-0097', customer: 'Isabelle Moreau', product: 'Cashmere Sweater', amount: 420, status: 'In Transit' },
  { id: 'LS-2024-0096', customer: 'Marcus Bell', product: 'Chelsea Boots', amount: 545, status: 'Delivered' },
];

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
};

function ProductModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#1a1a1a] rounded-xl w-full max-w-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-[#1a1a1a] dark:text-white">Add New Product</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Product Name', type: 'text', placeholder: 'e.g. Silk Evening Gown' },
            { label: 'Price ($)', type: 'number', placeholder: '0.00' },
            { label: 'Category', type: 'text', placeholder: 'women, men, accessories...' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded text-sm bg-transparent outline-none focus:border-[#c9a96e] transition-colors" />
            </div>
          ))}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1.5">Description</label>
            <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 dark:border-white/10 rounded text-sm bg-transparent outline-none focus:border-[#c9a96e] transition-colors resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 dark:border-white/10 rounded text-xs tracking-widest uppercase hover:border-gray-300 transition-colors">Cancel</button>
          <button className="flex-1 py-2.5 bg-[#c9a96e] text-white rounded text-xs tracking-widest uppercase hover:bg-[#9a7a4a] transition-colors">Add Product</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const [submitted, setSubmitted] = useState(false)
  const { user, isAdmin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  if (!user) return <Navigate to="/login" replace />;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { id: 'products', label: 'Products', Icon: Package },
    { id: 'orders', label: 'Orders', Icon: ShoppingBag },
    { id: 'customers', label: 'Customers', Icon: Users },
    { id: 'analytics', label: 'Analytics', Icon: BarChart2 },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex pt-16">
      {showModal && <ProductModal onClose={() => setShowModal(false)} />}

      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-white dark:bg-[#111] border-r border-gray-100 dark:border-white/5 fixed left-0 top-16 bottom-0 overflow-y-auto hidden md:block">
        <div className="p-4 pt-6">
          <p className="text-[9px] tracking-[0.4em] uppercase text-gray-400 mb-4 px-2">Admin Panel</p>
          <nav className="space-y-0.5">
            {sidebarItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wider transition-colors ${activeTab === id ? 'bg-[#c9a96e]/10 text-[#c9a96e] font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <Icon size={14} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-56 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-serif font-light text-[#1a1a1a] dark:text-white capitalize">{activeTab}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Lush Stitches Admin · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          {activeTab === 'products' && (
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-white text-xs tracking-widest uppercase rounded hover:bg-[#9a7a4a] transition-colors">
              <Plus size={13} /> Add Product
            </button>
          )}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-widest uppercase text-gray-400">{stat.label}</span>
                    <stat.icon size={14} className="text-[#c9a96e]" strokeWidth={1.5} />
                  </div>
                  <div className="text-2xl font-semibold text-[#1a1a1a] dark:text-white">{stat.value}</div>
                  <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? 'text-green-500' : 'text-red-400'}`}>
                    {stat.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {stat.change} <span className="text-gray-400 font-normal">vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue chart placeholder */}
            <div className="bg-white dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-xs tracking-widest uppercase text-gray-400 mb-6">Revenue Overview</h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#c9a96e]/20 hover:bg-[#c9a96e]/40 rounded-t transition-colors relative group cursor-pointer" style={{ height: `${h}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${Math.round(h * 1200)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m} className="flex-1 text-center text-[9px] text-gray-400">{m}</span>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-white/5 rounded-xl p-6">
              <h3 className="text-xs tracking-widest uppercase text-gray-400 mb-5">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/5">
                      {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                        <th key={h} className="text-left py-2 pb-3 text-[10px] tracking-widest uppercase text-gray-400 font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                        <td className="py-3 font-medium text-[#1a1a1a] dark:text-white">{order.id}</td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">{order.customer}</td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">{order.product}</td>
                        <td className="py-3 font-semibold text-[#1a1a1a] dark:text-white">${order.amount}</td>
                        <td className="py-3">
                          <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-white/10 rounded text-xs bg-transparent outline-none focus:border-[#c9a96e] transition-colors"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5">
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} className="text-left py-2 pb-3 text-[10px] tracking-widest uppercase text-gray-400 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded overflow-hidden flex-shrink-0">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-[#1a1a1a] dark:text-white text-xs leading-tight max-w-32 line-clamp-2">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 text-xs capitalize">{p.category}</td>
                      <td className="py-3 font-semibold text-[#1a1a1a] dark:text-white text-xs">${p.price}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-medium ${p.inStock ? 'text-green-500' : 'text-red-400'}`}>
                          {p.inStock ? 'In Stock' : 'Out'}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-gray-500">{p.rating} ★</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded hover:bg-[#c9a96e]/10 text-gray-400 hover:text-[#c9a96e] transition-colors">
                            <Edit2 size={12} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs */}
        {!['dashboard', 'products'].includes(activeTab) && (
          <div className="bg-white dark:bg-white/5 rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">◈</div>
            <h3 className="font-serif text-lg text-[#1a1a1a] dark:text-white mb-2 capitalize">{activeTab} Module</h3>
            <p className="text-gray-400 text-sm">This section is ready to be connected to your backend API.</p>
          </div>
        )}
      </main>
    </div>
  );
}
