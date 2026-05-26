function ShopFilterPanel({
  categories,
  mainCategory,
  subCategory,
  fabricFilter,
  seasonFilter,
  collectionFilter,
  priceRange,
  onSelectMainCategory,
  onSelectSubCategory,
  onToggleFabric,
  onToggleSeason,
  onToggleCollection,
  onPriceChange,
  resetFilters,
}) {
  const allSubcategories = Array.from(
    new Set(categories.flatMap((item) => item.subcategories.map((sub) => sub.name)))
  )

  const activeCategory = categories.find((item) => item.name === mainCategory)
  const visibleSubcategories = activeCategory
    ? activeCategory.subcategories.map((sub) => sub.name)
    : allSubcategories

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950/90">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Refine shop</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Filters</h3>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Main categories</p>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => onSelectMainCategory(category.name)}
                className={`w-full rounded-3xl border px-5 py-3 text-left text-sm font-medium transition ${
                  mainCategory === category.name
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Subcategories</p>
            <span className="text-xs text-slate-400">Choose one</span>
          </div>
          <div className="mt-4 grid gap-3">
            <button
              type="button"
              onClick={() => onSelectSubCategory("All")}
              className={`rounded-3xl border px-5 py-3 text-sm font-medium text-left transition ${
                subCategory === "All"
                  ? "border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              }`}
            >
              All subcategories
            </button>
            {visibleSubcategories.map((subcategory) => (
              <button
                key={subcategory}
                type="button"
                onClick={() => onSelectSubCategory(subcategory)}
                className={`rounded-3xl border px-5 py-3 text-sm font-medium text-left transition ${
                  subCategory === subcategory
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Fabrics</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.fabrics)))
            ).map((fabric) => (
              <label key={fabric} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={fabricFilter.includes(fabric)}
                  onChange={() => onToggleFabric(fabric)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-900"
                />
                {fabric}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Seasonal collections</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.collections)))
            ).map((collection) => (
              <label key={collection} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={collectionFilter.includes(collection)}
                  onChange={() => onToggleCollection(collection)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-900"
                />
                {collection}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Season</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.seasons)))
            ).map((season) => (
              <label key={season} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={seasonFilter.includes(season)}
                  onChange={() => onToggleSeason(season)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-900"
                />
                {season}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Price slider</p>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Rs. {priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="800"
            max="15000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="mt-4 w-full accent-slate-900 dark:accent-slate-100"
          />
          <div className="mt-3 flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Rs. {priceRange[0]}</span>
            <span>Rs. 15,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopFilterPanel
