import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { WishlistContext } from "../context/WishlistContext"

function Profile() {
  const { user, logout } = useContext(AuthContext)
  const { wishlist } = useContext(WishlistContext)
  const [addresses] = useState([
    {
      id: 1,
      title: "Home",
      line: "42 Pristine Lane",
      city: "Mumbai",
      region: "Maharashtra",
      postal: "400001",
    },
    {
      id: 2,
      title: "Office",
      line: "101 Style Avenue",
      city: "Mumbai",
      region: "Maharashtra",
      postal: "400021",
    },
  ])

  const orders = [
    {
      id: "ST-1001",
      date: "May 12, 2026",
      status: "Delivered",
      total: 6499,
    },
    {
      id: "ST-1002",
      date: "Apr 28, 2026",
      status: "Shipped",
      total: 4299,
    },
    {
      id: "ST-1003",
      date: "Apr 10, 2026",
      status: "Processing",
      total: 3399,
    },
  ]

  const [notifications, setNotifications] = useState(true)
  const [offers, setOffers] = useState(false)

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] bg-white/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Lush Stitches</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">My Dashboard</h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Manage your profile, saved items, orders, and account preferences from one elegant dashboard.
              </p>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Profile</p>
              <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{user?.email}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>Wishlist</span>
                  <span>{wishlist.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>Orders</span>
                  <span>{orders.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                  <span>Addresses</span>
                  <span>{addresses.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Quick actions</p>
              <div className="mt-6 grid gap-4">
                <button className="rounded-3xl border border-slate-200 px-4 py-4 text-left text-sm text-slate-900 transition hover:bg-slate-50">
                  Update profile
                </button>
                <button className="rounded-3xl border border-slate-200 px-4 py-4 text-left text-sm text-slate-900 transition hover:bg-slate-50">
                  Manage addresses
                </button>
                <button className="rounded-3xl border border-slate-200 px-4 py-4 text-left text-sm text-slate-900 transition hover:bg-slate-50">
                  Account settings
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Notifications</p>
              <div className="mt-6 space-y-4">
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 px-4 py-3">
                  <span className="text-sm text-slate-700">Order updates</span>
                  <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="h-5 w-5 rounded border-slate-300 text-slate-900" />
                </label>
                <label className="flex items-center justify-between rounded-3xl border border-slate-200 px-4 py-3">
                  <span className="text-sm text-slate-700">Promotional offers</span>
                  <input type="checkbox" checked={offers} onChange={() => setOffers(!offers)} className="h-5 w-5 rounded border-slate-300 text-slate-900" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order history</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Recent purchases</h2>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-slate-200 p-4 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Order {order.id}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{order.status}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:text-right">
                      <p className="text-sm text-slate-500">{order.date}</p>
                      <p className="text-lg font-semibold">Rs. {order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Saved wishlist</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Favorites</h2>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {wishlist.length > 0 ? (
                  wishlist.slice(0, 4).map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                      <img src={item.image} alt={item.title} className="h-36 w-full rounded-2xl object-cover" />
                      <div className="mt-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.category}</p>
                        <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">Rs. {item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                    No saved items yet.
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Address management</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Saved addresses</h2>
              <div className="mt-6 space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="rounded-3xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-900">{address.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{address.line}</p>
                    <p className="text-sm text-slate-600">{address.city}, {address.region} {address.postal}</p>
                    <button className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Account settings</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Security</h2>
              <div className="mt-6 space-y-4">
                <button className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                  Change password
                </button>
                <button className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                  Manage payment methods
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Profile