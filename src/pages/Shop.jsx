import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import ProductCard from "../components/ProductCard"
import products from "../data/products"
import SkeletonCard from "../components/SkeletonCard"
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

function Shop() {
  const [search, setSearch] = useState("")
  const [mainCategory, setMainCategory] = useState("All")
  const [subCategory, setSubCategory] = useState("All")
  const [fabricFilter, setFabricFilter] = useState([])
  const [collectionFilter, setCollectionFilter] = useState([])
  const [seasonFilter, setSeasonFilter] = useState([])
  const [sizeFilter, setSizeFilter] = useState([])
  const [priceRange, setPriceRange] = useState([800, 15000])
  const [sortBy, setSortBy] = useState("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const perPage = 12

  const sizeOptions = useMemo(() => {
    const sizes = Array.from(new Set(products.flatMap((product) => product.sizes)))
    const order = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One Size"]
    return sizes.sort((a, b) => order.indexOf(a) - order.indexOf(b) || a.localeCompare(b))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, mainCategory, subCategory, fabricFilter, collectionFilter, seasonFilter, sizeFilter, priceRange, sortBy])

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

    if (sizeFilter.length > 0) {
      results = results.filter((product) =>
        product.sizes.some((size) => sizeFilter.includes(size))
      )
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
  }, [search, mainCategory, subCategory, fabricFilter, collectionFilter, seasonFilter, sizeFilter, priceRange, sortBy])

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
    <section className="bg-brand-bg py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-premium sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div className="space-y-5 text-brand-charcoal">
              <span className="inline-flex rounded-full bg-brand-beige px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-charcoal/80">
                Extra 20% off selected edits
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Modern wardrobe drops for timeless color.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-brand-muted">
                Shop fresh collections with premium fabrics, refined details, and effortless polish. Free shipping on orders over Rs. 8,000.
              </p>
            </div>

            <div className="rounded-[2rem] bg-brand-bg p-6 ring-1 ring-brand-border sm:p-8">
              <div className="space-y-4 text-brand-charcoal">
                <div className="rounded-3xl bg-brand-beige/20 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Limited Time</p>
                  <p className="mt-3 text-2xl font-semibold">Signature staples & refined layers</p>
                </div>
                <div className="grid gap-4 rounded-3xl bg-brand-bg p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Free shipping</p>
                    <p className="mt-2 text-lg font-semibold">Orders over Rs. 8,000</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Fast exchange</p>
                    <p className="mt-2 text-lg font-semibold">Easy 14-day returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-brand-shadow">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search silk dresses, kurta sets, accessories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-brand-border bg-brand-bg px-12 py-4 text-sm text-brand-charcoal outline-none transition focus:border-brand-charcoal focus:ring-2 focus:ring-brand-beige"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-5 py-3 text-sm font-semibold text-brand-charcoal transition hover:bg-brand-beige"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-muted">
                <span className="font-semibold text-brand-charcoal">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-transparent bg-transparent px-2 py-1 text-sm outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-brand-muted" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {['All', 'Women', 'Men', 'Kids', 'Accessories'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setMainCategory(label)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mainCategory === label
                    ? 'bg-brand-charcoal text-brand-bg shadow-lg'
                    : 'bg-brand-bg text-brand-charcoal hover:bg-brand-beige'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-8 xl:grid-cols-[320px_1fr]">
            <aside className="hidden xl:block">
              <ShopFilterPanel
                categories={categorySchema}
                mainCategory={mainCategory}
                subCategory={subCategory}
                fabricFilter={fabricFilter}
                seasonFilter={seasonFilter}
                collectionFilter={collectionFilter}
                priceRange={priceRange}
                sizeFilter={sizeFilter}
                sizeOptions={sizeOptions}
                onSelectMainCategory={setMainCategory}
                onSelectSubCategory={setSubCategory}
                onToggleFabric={(value) => toggleArrayValue(value, fabricFilter, setFabricFilter)}
                onToggleSeason={(value) => toggleArrayValue(value, seasonFilter, setSeasonFilter)}
                onToggleCollection={(value) => toggleArrayValue(value, collectionFilter, setCollectionFilter)}
                onToggleSize={(value) => toggleArrayValue(value, sizeFilter, setSizeFilter)}
                onPriceChange={setPriceRange}
                resetFilters={resetFilters}
              />
            </aside>

            <main>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-3xl bg-brand-bg px-4 py-3 text-sm text-brand-charcoal shadow-sm">
                  {filteredProducts.length} products found
                  {mainCategory !== 'All' && ` · ${mainCategory}`}
                  {subCategory !== 'All' && ` · ${subCategory}`}
                </div>
                {sizeFilter.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-sm text-brand-muted">
                    <span>Sizes:</span>
                    {sizeFilter.map((size) => (
                      <span key={size} className="rounded-full bg-brand-bg px-3 py-1 font-semibold text-brand-charcoal">
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                {loading
                  ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                  : paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>

              {!loading && filteredProducts.length === 0 && (
                <div className="mt-16 rounded-[2rem] border border-brand-border bg-white p-10 text-center shadow-sm">
                  <p className="text-lg font-semibold text-brand-charcoal">No products match your search yet.</p>
                  <p className="mt-3 text-brand-muted">Try a broader term, reset filters, or explore another category.</p>
                </div>
              )}

              {!loading && filteredProducts.length > 0 && (
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  {currentPage < totalPages && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-5 py-3 text-sm font-semibold text-brand-bg transition hover:bg-brand-charcoal/90"
                    >
                      Load more styles
                    </button>
                  )}
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
            className="fixed inset-0 z-50 bg-brand-charcoal/20 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Filters</p>
                  <h2 className="mt-2 text-2xl font-semibold text-brand-charcoal">Refine your search</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-sm font-semibold text-brand-charcoal transition hover:text-brand-muted"
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
                  sizeFilter={sizeFilter}
                  sizeOptions={sizeOptions}
                  onSelectMainCategory={setMainCategory}
                  onSelectSubCategory={setSubCategory}
                  onToggleFabric={(value) => toggleArrayValue(value, fabricFilter, setFabricFilter)}
                  onToggleSeason={(value) => toggleArrayValue(value, seasonFilter, setSeasonFilter)}
                  onToggleCollection={(value) => toggleArrayValue(value, collectionFilter, setCollectionFilter)}
                  onToggleSize={(value) => toggleArrayValue(value, sizeFilter, setSizeFilter)}
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
