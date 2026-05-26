import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react';
import { ChevronDown } from "lucide-react"
import products from "../data/products"
import ProductCard from "./ProductCard"
import collections from "../data/collections"


function BannerSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#c9a96e] text-[11px] tracking-[0.5em] uppercase">Exclusive</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-serif font-light leading-tight">
            The Art of<br /><em className="italic">Effortless Dressing</em>
          </h2>
          <p className="mt-4 text-gray-300 text-sm font-light leading-relaxed max-w-sm mx-auto">
            Discover our curated edit of seasonless pieces designed to be worn for decades, not seasons.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 px-10 py-3.5 border border-white text-white text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all rounded"
          >
            Explore Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default BannerSection