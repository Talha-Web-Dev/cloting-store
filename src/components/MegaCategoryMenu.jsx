import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

function MegaCategoryMenu({ categories, activeMain, selectedSubCategory, onSelectMain, onSelectSub }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 px-5 py-8 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Mega category system
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              Shop by luxury edit
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Navigate curated edits for Women, Men, and Kids with nested subcategories, seasonal collections, and premium fabrics.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/95 px-5 py-4 text-white shadow-xl shadow-slate-900/20 dark:bg-slate-100/10 dark:text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300 dark:text-slate-400">Featured collection</p>
            <p className="mt-2 text-lg font-semibold">Sapphire-inspired Luxe Edit</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {categories.map((category) => {
            const isActive = activeMain === category.name

            return (
              <motion.div
                key={category.name}
                whileHover={{ y: -4 }}
                className={`group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition duration-300 dark:border-slate-700 dark:bg-slate-900 ${isActive ? "shadow-2xl shadow-slate-900/10" : "hover:border-slate-300 hover:bg-white"}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectMain(category.name)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{category.name}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{category.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-slate-500 transition ${isActive ? "rotate-180" : ""}`} />
                </button>

                <div className={`mt-7 space-y-5 border-t border-slate-200 pt-6 transition-all duration-300 ${isActive ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="rounded-3xl border border-slate-200 bg-white p-4 transition duration-200 dark:border-slate-700 dark:bg-slate-950">
                      <button
                        type="button"
                        onClick={() => onSelectSub(subcategory.name)}
                        className={`flex w-full items-center justify-between text-left ${selectedSubCategory === subcategory.name ? "text-slate-950 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
                      >
                        <div>
                          <p className="text-sm font-semibold">{subcategory.name}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subcategory.types.join(" • ")}</p>
                        </div>
                        <span className={`inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold ${selectedSubCategory === subcategory.name ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                          View
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MegaCategoryMenu
