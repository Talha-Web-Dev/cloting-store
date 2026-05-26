import { Link } from "react-router-dom"
import { Gem, Shirt, Sparkles, Watch } from "lucide-react"
import { motion } from "framer-motion"

function Categories() {
  const categories = [
    {
      name: "Hoodies",
      icon: Sparkles,
      color: "from-slate-950 to-stone-600",
      count: 45,
    },
    {
      name: "T-Shirts",
      icon: Shirt,
      color: "from-zinc-800 to-rose-500",
      count: 62,
    },
    {
      name: "Jackets",
      icon: Gem,
      color: "from-emerald-900 to-teal-500",
      count: 28,
    },
    {
      name: "Accessories",
      icon: Watch,
      color: "from-amber-700 to-yellow-500",
      count: 85,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <> 
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-20 transition duration-500 dark:from-slate-900 dark:to-slate-950 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Shop by category
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
            Curated collections for every style
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Explore premium edits organized by category, from soft essentials to sharp finishing pieces.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div key={category.name} variants={item}>
                <Link
                  to={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                  <div className="relative z-10 space-y-4">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {category.count} items
                      </p>
                    </div>

                    <div className="inline-block text-slate-400 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default Categories
