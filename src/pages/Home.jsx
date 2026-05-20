import AnnouncementBar from "../components/AnnouncementBar"
import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"
import ScrollToTop from "../components/ScrollToTop"
import NewArrivals from "../components/NewArrivals"
import InstagramGallery from "../components/InstagramGallery"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(255,255,255,0.02),_transparent_30%)]" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-8 px-6 py-24 sm:px-10">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-slate-200">
            New Collection
          </span>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-serif leading-tight text-white sm:text-6xl">
              Lush Stitches — Modern luxury, tailored for everyday.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Crafted materials, refined silhouettes and subtle details — a curated edit for the contemporary wardrobe.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-xl transition hover:scale-[1.02]"
            >
              Shop Collection
            </Link>
            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Explore Account
            </Link>
          </div>
        </div>
      </section>

      <AnnouncementBar />
      <FeaturedProducts />
      <NewArrivals />
      <Categories />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
      <ScrollToTop />
    </div>
  )
}

export default Home
