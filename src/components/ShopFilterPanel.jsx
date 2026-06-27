function ShopFilterPanel({
  categories,
  mainCategory,
  subCategory,
  fabricFilter,
  seasonFilter,
  collectionFilter,
  sizeFilter,
  sizeOptions,
  priceRange,
  onSelectMainCategory,
  onSelectSubCategory,
  onToggleFabric,
  onToggleSeason,
  onToggleCollection,
  onToggleSize,
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
    <div className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-premium">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Refine shop</p>
          <h3 className="mt-3 text-2xl font-semibold text-brand-charcoal">Filters</h3>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-full bg-brand-bg px-4 py-2 text-sm font-medium text-brand-charcoal transition hover:bg-brand-beige"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Main categories</p>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => onSelectMainCategory(category.name)}
                className={`w-full rounded-3xl border px-5 py-3 text-left text-sm font-medium transition ${
                  mainCategory === category.name
                    ? "border-brand-charcoal bg-brand-charcoal text-brand-bg shadow-lg"
                    : "border-brand-border bg-brand-bg text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-beige"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Subcategories</p>
            <span className="text-xs text-brand-muted">Choose one</span>
          </div>
          <div className="mt-4 grid gap-3">
            <button
              type="button"
              onClick={() => onSelectSubCategory("All")}
              className={`rounded-3xl border px-5 py-3 text-sm font-medium text-left transition ${
                subCategory === "All"
                  ? "border-brand-charcoal bg-brand-charcoal text-brand-bg shadow-lg"
                  : "border-brand-border bg-brand-bg text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-beige"
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
                    ? "border-brand-charcoal bg-brand-charcoal text-brand-bg shadow-lg"
                    : "border-brand-border bg-brand-bg text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-beige"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Fabrics</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.fabrics)))
            ).map((fabric) => (
              <label key={fabric} className="flex items-center gap-3 rounded-3xl border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-beige">
                <input
                  type="checkbox"
                  checked={fabricFilter.includes(fabric)}
                  onChange={() => onToggleFabric(fabric)}
                  className="h-4 w-4 rounded border-brand-border text-brand-charcoal focus:ring-brand-charcoal"
                />
                {fabric}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Seasonal collections</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.collections)))
            ).map((collection) => (
              <label key={collection} className="flex items-center gap-3 rounded-3xl border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-beige">
                <input
                  type="checkbox"
                  checked={collectionFilter.includes(collection)}
                  onChange={() => onToggleCollection(collection)}
                  className="h-4 w-4 rounded border-brand-border text-brand-charcoal focus:ring-brand-charcoal"
                />
                {collection}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Season</p>
          <div className="mt-4 grid gap-3">
            {Array.from(
              new Set(categories.flatMap((item) => item.subcategories.flatMap((sub) => sub.seasons)))
            ).map((season) => (
              <label key={season} className="flex items-center gap-3 rounded-3xl border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-beige">
                <input
                  type="checkbox"
                  checked={seasonFilter.includes(season)}
                  onChange={() => onToggleSeason(season)}
                  className="h-4 w-4 rounded border-brand-border text-brand-charcoal focus:ring-brand-charcoal"
                />
                {season}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Sizes</p>
          <div className="mt-4 grid gap-3">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-3 rounded-3xl border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-beige">
                <input
                  type="checkbox"
                  checked={sizeFilter.includes(size)}
                  onChange={() => onToggleSize(size)}
                  className="h-4 w-4 rounded border-brand-border text-brand-charcoal focus:ring-brand-charcoal"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-muted">Price slider</p>
            <span className="text-sm font-semibold text-brand-charcoal">Rs. {priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="800"
            max="15000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="mt-4 w-full accent-brand-charcoal"
          />
          <div className="mt-3 flex justify-between text-sm text-brand-muted">
            <span>Rs. {priceRange[0]}</span>
            <span>Rs. 15,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopFilterPanel
