import { ShoppingCart, User, Menu, X, Heart } from "lucide-react"
import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const [open, setOpen] = useState(false)

  const themeContext = useContext(ThemeContext)
  const authContext = useContext(AuthContext)

  if (!themeContext || !authContext) {
    return null
  }

  const { theme, toggleTheme } = themeContext
  const { isAuthenticated, isAdmin, logout } = authContext

  const navClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-slate-300 transition hover:text-white"

  const iconButton = "inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-300 shadow-lg transition hover:bg-white/10 hover:text-white"

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold uppercase tracking-[0.3em] text-white">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-lg font-bold text-white">LS</span>
          <span className="hidden sm:inline">Lush Stitches</span>
        </NavLink>

        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <li>
            <NavLink to="/" className={navClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={navClass}>
              Shop
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile" className={navClass}>
                  Profile
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={navClass}>
                    Admin
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={logout}
                  className="text-slate-600 hover:text-slate-900 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={navClass}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="hidden rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 md:inline-flex"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          <NavLink to="/cart" className={iconButton} title="Cart">
            <ShoppingCart size={18} />
          </NavLink>

          <NavLink to="/profile" className={iconButton} title="Wishlist">
            <Heart size={18} />
          </NavLink>

          <NavLink to="/profile" className={iconButton} title="Account">
            <User size={18} />
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-300 shadow-lg transition hover:bg-white/10 md:hidden"
            aria-label="Toggle mobile menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-0 z-40 h-screen overflow-hidden bg-slate-950/95 p-6 transition-all duration-300 ease-out md:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.3em] text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-white/10">LS</span>
            Menu
          </div>
          <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-300 transition hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-6 text-lg font-semibold text-slate-100">
          <NavLink to="/" onClick={() => setOpen(false)} className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)} className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className={navClass}>
            Cart
          </NavLink>
          <NavLink to="/profile" onClick={() => setOpen(false)} className={navClass}>
            Profile
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)} className={navClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <NavLink to="/cart" onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
            <span>Cart</span>
            <ShoppingCart size={18} />
          </NavLink>
          <NavLink to="/profile" onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
            <span>Wishlist</span>
            <Heart size={18} />
          </NavLink>
          <NavLink to="/profile" onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
            <span>Profile</span>
            <User size={18} />
          </NavLink>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6 text-slate-400">
          <p className="text-sm">Style your next collection in motion.</p>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="#" className="transition hover:text-white"><Instagram size={18} /></a>
            <a href="#" className="transition hover:text-white"><Twitter size={18} /></a>
            <a href="#" className="transition hover:text-white"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;