import { Camera, Heart } from "lucide-react"
import products from "../data/products"
import { motion } from "framer-motion"

export default function InstagramGallery() {
  const items = products.slice(0, 8)

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 transition duration-500 dark:text-slate-100">
      <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500">
              <Camera size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Follow us on Instagram</p>
              <h2 className="mt-1 text-3xl font-semibold text-slate-950 dark:text-white">@lushstitches</h2>
            </div>
          </div>
        </div>
        <a
          href="https://instagram.com/lushstitches"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
        >
          <Camera size={16} />
          Follow
        </a>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {items.map((product) => (
          <motion.a
            key={product.id}
            href="https://instagram.com/lushstitches"
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-64"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
              <div className="flex w-full items-center justify-between text-white">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-slate-200">@lushstitches</p>
                </div>
                <Heart size={20} className="fill-white" />
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Tag us <span className="font-semibold text-slate-900 dark:text-white">@lushstitches</span> for a chance to be featured
        </p>
      </div>
    </section>
  )
}

