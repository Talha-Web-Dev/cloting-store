import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import products from "../data/products"
import SkeletonCard from "../components/SkeletonCard"
import MegaCategoryMenu from "../components/MegaCategoryMenu"
import ShopFilterPanel from "../components/ShopFilterPanel"
import Pagination from "../components/Pagination"

const categorySchema = [
  {
    name: "Women",
    title: "Women",
    description: "Modern eastern wear, refined western tailoring, modest silhouettes and elevated accessories.",
    subcategories: [
      {
        name: "Eastern Wear",
        types: ["Lawn Kurtas", "Anarkalis", "Silk Shawls"],
        collections: ["Lawn Edit", "Bridal Edit"],
        fabrics: ["Lawn", "Silk", "Chiffon"],
        seasons: ["Spring/Summer", "Festive"],
      },
      {
        name: "Western Wear",
        types: ["Blazers", "Dresses", "Outerwear"],
        collections: ["Urban Luxe", "Evening Edit"],
        fabrics: ["Wool Blend", "Silk", "Velvet"],
        seasons: ["Autumn/Winter", "All Season"],
      },
      {
        name: "Modest Wear",
        types: ["Maxi Gowns", "Long Coats", "Tunic Sets"],
        collections: ["Modest Elegance", "Evening Edit"],
        fabrics: ["Silk", "Lawn", "Chiffon"],
        seasons: ["Spring/Summer", "Autumn/Winter"],
      },
      {
        name: "Accessories",
        types: ["Scarves", "Belts", "Watches"],
        collections: ["Signature Accessories", "Bridal Edit"],
        fabrics: ["Silk", "Leather"],
        seasons: ["All Season"],
      },
    ],
  },
  {
    name: "Men",
    title: "Men",
    description: "Tailored eastern classics, premium western staples and elevated footwear for modern menswear.",
    subcategories: [
      {
        name: "Eastern Wear",
        types: ["Kurta Sets", "Sherwanis", "Nehru Jackets"],
        collections: ["Festive Edit", "Heritage Tailoring"],
        fabrics: ["Silk", "Lawn", "Cotton"],
        seasons: ["Festive", "All Season"],
      },
      {
        name: "Western Wear",
        types: ["Blazers", "Shirts", "Coats"],
        collections: ["Urban Luxe", "Office Edit"],
        fabrics: ["Wool Blend", "Cotton", "Linen"],
        seasons: ["Autumn/Winter", "All Season"],
      },
      {
        name: "Footwear",
        types: ["Sneakers", "Loafers", "Sandals"],
        collections: ["Street Edit", "Classic Leather"],
        fabrics: ["Leather", "Canvas"],
        seasons: ["All Season"],
      },
    ],
  },
  {
    name: "Kids",
    title: "Kids",
    description: "Soft celebration looks for girls, boys and babies in luxe fabrics and playful silhouettes.",
    subcategories: [
      {
        name: "Girls",
        types: ["Party Dresses", "Tunics", "Co-ords"],
        collections: ["Kids Celebration", "Spring Edit"],
        fabrics: ["Chiffon", "Silk", "Cotton"],
        seasons: ["Spring/Summer", "All Season"],
      },
      {
        name: "Boys",
        types: ["Shirts", "Kurta Sets", "Jackets"],
        collections: ["Kids Essentials", "Festive Edit"],
        fabrics: ["Cotton", "Linen"],
        seasons: ["Spring/Summer", "Festive"],
      },
      {
        name: "Baby",
        types: ["Mini Sets", "Swaddles", "Soft Shoes"],
        collections: ["Baby Basics", "Celebration"],
        fabrics: ["Linen", "Cotton"],
        seasons: ["Spring/Summer", "All Season"],
      },
    ],
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
]

const seasonalHighlights = [
  {
    label: "Lawn Edit",
    title: "Soft summer silhouettes",
    accent: "Inspired by sapphire-inspired tonal palettes.",
  },
  {
    label: "Festive Edit",
    title: "Bridal-ready luxury",
    accent: "Embroidered surfaces with rich textures.",
  },
  {
    label: "Urban Luxe",
    title: "Tailored ready-to-wear",
    accent: "Modern lines for elevated everyday dressing.",
  },
]

function Shop() {
  const [search, setSearch] = useState("")
  const [mainCategory, setMainCategory] = useState("All")
  const [subCategory, setSubCategory] = useState("All")
  const [fabricFilter, setFabricFilter] = useState([])
  const [collectionFilter, setCollectionFilter] = useState([])
  const [seasonFilter, setSeasonFilter] = useState([])
  const [priceRange, setPriceRange] = useState([800, 15000])
  const [sortBy, setSortBy] = useState("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const perPage = 9

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, mainCategory, subCategory, fabricFilter, collectionFilter, seasonFilter, priceRange, sortBy])

  useEffect(() => {
    if (mainCategory === "All") return
    setSubCategory("All")
  }, [mainCategory])

  const filteredProducts = useMemo(() => {
    let results = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )

    if (mainCategory !== "All") {
      results = results.filter((product) => product.mainCategory === mainCategory)
    }

    if (subCategory !== "All") {
      results = results.filter((product) => product.subCategory === subCategory)
    }

    if (fabricFilter.length > 0) {
      results = results.filter((product) => fabricFilter.includes(product.fabric))
    }

    if (collectionFilter.length > 0) {
      results = results.filter((product) => collectionFilter.includes(product.collection))
    }

    if (seasonFilter.length > 0) {
      results = results.filter((product) => seasonFilter.includes(product.season))
    }

    results = results.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    if (sortBy === "price-low") {
      results = [...results].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      results = [...results].sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      results = [...results].sort((a, b) => b.id - a.id)
    } else {
      results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return results
  }, [search, mainCategory, subCategory, fabricFilter, collectionFilter, seasonFilter, priceRange, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage))
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage)

  const toggleArrayValue = (value, list, setList) => {
    const next = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value]
    setList(next)
  }

  const resetFilters = () => {
    setSearch("")
    setMainCategory("All")
    setSubCategory("All")
    setFabricFilter([])
    setCollectionFilter([])
    setSeasonFilter([])
    setPriceRange([800, 15000])
    setSortBy("popular")
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 transition duration-500 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-950/10 sm:px-10 sm:py-14">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Lush Stitches</span>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight">Luxury fashion for every season.</h1>
            <p className="mt-5 max-w-2xl text-slate-300">
              Discover premium Pakistani fashion with curated women, men, and kids collections, elegant fabrics and timeless silhouettes.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Collections</p>
                <p className="mt-3 text-xl font-semibold text-white">Seasonal edits</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Filters</p>
                <p className="mt-3 text-xl font-semibold text-white">Fabric forward</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Design</p>
                <p className="mt-3 text-xl font-semibold text-white">Elegant minimalism</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {seasonalHighlights.map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950/90">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{item.label}</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">{item.accent}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <MegaCategoryMenu
            categories={categorySchema}
            activeMain={mainCategory}
            selectedSubCategory={subCategory}
            onSelectMain={setMainCategory}
            onSelectSub={setSubCategory}
          />
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950/90 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search premium fabrics, kurtas, dresses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-12 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:ring-slate-700"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                {filteredProducts.length} results
                {mainCategory !== "All" && ` · ${mainCategory}`}
                {subCategory !== "All" && ` · ${subCategory}`}
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/80">
                <span className="text-slate-500 dark:text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-transparent bg-transparent text-sm text-slate-900 outline-none focus:outline-none dark:text-slate-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
            <aside className="hidden xl:block">
              <ShopFilterPanel
                categories={categorySchema}
                mainCategory={mainCategory}
                subCategory={subCategory}
                fabricFilter={fabricFilter}
                seasonFilter={seasonFilter}
                collectionFilter={collectionFilter}
                priceRange={priceRange}
                onSelectMainCategory={setMainCategory}
                onSelectSubCategory={setSubCategory}
                onToggleFabric={(value) => toggleArrayValue(value, fabricFilter, setFabricFilter)}
                onToggleSeason={(value) => toggleArrayValue(value, seasonFilter, setSeasonFilter)}
                onToggleCollection={(value) => toggleArrayValue(value, collectionFilter, setCollectionFilter)}
                onPriceChange={setPriceRange}
                resetFilters={resetFilters}
              />
            </aside>

            <main>
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {loading
                  ? Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
                  : paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>

              {loading || filteredProducts.length === 0 ? null : (
                <div className="mt-10">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl dark:bg-slate-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Filters</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Refine shop</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-8">
                <ShopFilterPanel
                  categories={categorySchema}
                  mainCategory={mainCategory}
                  subCategory={subCategory}
                  fabricFilter={fabricFilter}
                  seasonFilter={seasonFilter}
                  collectionFilter={collectionFilter}
                  priceRange={priceRange}
                  onSelectMainCategory={setMainCategory}
                  onSelectSubCategory={setSubCategory}
                  onToggleFabric={(value) => toggleArrayValue(value, fabricFilter, setFabricFilter)}
                  onToggleSeason={(value) => toggleArrayValue(value, seasonFilter, setSeasonFilter)}
                  onToggleCollection={(value) => toggleArrayValue(value, collectionFilter, setCollectionFilter)}
                  onPriceChange={setPriceRange}
                  resetFilters={() => {
                    resetFilters()
                    setMobileFiltersOpen(false)
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Shop
