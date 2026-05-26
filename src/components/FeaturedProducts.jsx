import products from "../data/products"
import ProductCard from "./ProductCard"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import collections from "../data/collections"

function FeaturedProducts() {
  return (
    <>
    <section className="bg-slate-100 py-16 transition duration-500 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Handpicked for you
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
            Featured Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Explore our premium collection of essentials that blend timeless design with modern comfort.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>



<section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[#c9a96e] text-[11px] tracking-[0.4em] uppercase">Curated</span>
          <h2 className="mt-1 text-3xl lg:text-4xl font-serif font-light text-[#1a1a1a] dark:text-white">Featured Collections</h2>
        </div>
        <Link to="/shop" className="text-xs tracking-widest uppercase text-[#c9a96e] hover:opacity-70 transition-opacity hidden sm:flex items-center gap-2">
          View All <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:row-span-2 aspect-[4/5]' : 'aspect-[4/3]'}`}
          >
            <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase">{col.subtitle}</p>
              <h3 className="text-white text-xl font-serif font-light mt-1">{col.name}</h3>
              <p className="text-white/60 text-xs mt-1">{col.items} pieces</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </>

  )
}

export default FeaturedProducts
