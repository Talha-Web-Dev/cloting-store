import { ShoppingCart, User, Menu, X, Heart, Search } from "lucide-react"
import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

function Navbar() {
  const [open, setOpen] = useState(false)

  const themeContext = useContext(ThemeContext)
  const authContext = useContext(AuthContext)
  const cartContext = useContext(CartContext)
  const wishlistContext = useContext(WishlistContext)

  if (!themeContext || !authContext || !cartContext || !wishlistContext) {
    return null
  }

  const { isAuthenticated, isAdmin, logout, user } = authContext
  const { cart } = cartContext
  const { wishlist } = wishlistContext
  const cartCount = cart.length
  const wishlistCount = wishlist.length

  const navClass = ({ isActive }) =>
    isActive
      ? "text-brand-charcoal font-semibold"
      : "text-brand-muted transition hover:text-brand-charcoal"

  const iconButton =
    "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-charcoal shadow-premium transition hover:bg-brand-bg"

  return (
    <nav className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/90 text-brand-charcoal backdrop-blur-xl transition duration-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold uppercase tracking-[0.3em] text-brand-charcoal">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-charcoal text-lg font-bold text-brand-bg">LS</span>
          <span className="hidden sm:inline">Lush & Stitches</span>
        </NavLink>

        {/* Desktop Navigation */}
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
                  className="text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
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

        {/* Icons */}
        <div className="flex items-center gap-3">
          <NavLink to="/shop" className={`${iconButton} hidden sm:inline-flex`} title="Search products">
            <Search size={18} />
          </NavLink>

          <NavLink to="/cart" className={iconButton} title="Shopping Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-semibold text-brand-charcoal shadow-lg">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/wishlist" className={iconButton} title="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-semibold text-brand-charcoal shadow-lg">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to={isAuthenticated ? "/profile" : "/login"} className={iconButton} title="Account">
            <User size={18} />
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-charcoal shadow-premium transition hover:bg-brand-bg md:hidden"
            aria-label="Toggle mobile menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-0 z-40 h-screen overflow-hidden bg-brand-bg/95 p-6 transition-all duration-300 ease-out md:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.3em] text-brand-charcoal">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-brand-charcoal text-brand-bg">LS</span>
            Menu
          </div>
          <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-charcoal transition hover:bg-brand-bg">
            <X size={20} />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-6 text-lg font-semibold text-slate-950 dark:text-slate-100">
          <NavLink to="/" onClick={() => setOpen(false)} className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)} className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className={navClass}>
            Cart ({cartCount})
          </NavLink>
          <NavLink to="/wishlist" onClick={() => setOpen(false)} className={navClass}>
            Wishlist ({wishlistCount})
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)} className={navClass}>
                Profile
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" onClick={() => setOpen(false)} className={navClass}>
                  Admin
                </NavLink>
              )}
            </>
          )}
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border border-slate-200/70 bg-slate-50/80 p-5 shadow-lg shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-900/70">
          {/* <button onClick={toggleTheme} className="inline-flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800">
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
            <span className="text-xs uppercase tracking-[0.24em]">{theme}</span>
          </button> */}
          <NavLink to="/cart" onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800">
            <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
            <ShoppingCart size={18} />
          </NavLink>
          <NavLink to="/wishlist" onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800">
            <span>Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
            <Heart size={18} />
          </NavLink>
          <NavLink to={isAuthenticated ? "/profile" : "/login"} onClick={() => setOpen(false)} className="inline-flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800">
            <span>{isAuthenticated ? "Profile" : "Login"}</span>
            <User size={18} />
          </NavLink>
        </div>

        {isAuthenticated && (
          <div className="mt-10 flex items-center justify-between border-t border-slate-200/70 pt-6 dark:border-slate-800">
            <div className="text-sm">
              <p className="text-slate-600 dark:text-slate-400">Welcome, {user?.name}!</p>
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
