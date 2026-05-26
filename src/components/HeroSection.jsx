import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import heroImage from "../assets/hero.png"
import { ArrowRight } from "lucide-react"

function HeroSection() {
  return (
  <> 
    <section className="relative overflow-hidden bg-stone-100 text-slate-950 transition duration-500 dark:bg-slate-950 dark:text-white">
      <img
        src={heroImage}
        alt="Lush Stitches editorial fashion collection"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.92),_rgba(255,255,255,0.64)_42%,_rgba(255,255,255,0.08)_76%)] dark:bg-[linear-gradient(90deg,_rgba(2,6,23,0.96),_rgba(2,6,23,0.76)_46%,_rgba(2,6,23,0.24)_78%)]" />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/35" />

      <div className="relative mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center px-6 py-20 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl space-y-7"
        >
          <span className="inline-flex rounded-full border border-slate-950/10 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-900 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
            Spring atelier 2026
          </span>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 dark:text-white sm:text-7xl">
              Lush Stitches
            </h1>
            <p className="text-sm uppercase tracking-[0.34em] text-slate-600 dark:text-slate-300">
              Modern luxury, tailored for everyday
            </p>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-200">
            Discover precise silhouettes, lush textures, and wardrobe icons made to last beyond the season.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
              Shop the collection
            </Link>
            <Link to="/shop?sort=newest" className="inline-flex items-center justify-center rounded-full border border-slate-950/20 bg-white/50 px-8 py-4 text-sm font-semibold text-slate-950 backdrop-blur transition hover:bg-white/80 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
              View new arrivals
            </Link>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-12 grid max-w-xl gap-4 justify-self-end rounded-2xl border border-white/30 bg-white/65 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 lg:mt-0"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-white/70 p-4 dark:bg-white/10">
              <p className="text-2xl font-semibold">42</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Drops</p>
            </div>
            <div className="rounded-xl bg-white/70 p-4 dark:bg-white/10">
              <p className="text-2xl font-semibold">4.9</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Rating</p>
            </div>
            <div className="rounded-xl bg-white/70 p-4 dark:bg-white/10">
              <p className="text-2xl font-semibold">24h</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Dispatch</p>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
            Premium essentials, elevated outerwear, soft tailoring, and accessories edited for a complete luxury shopping experience.
          </p>
        </motion.div> */}
      </div>
    </section> 

    
     
    </>
  )
}

export default HeroSection
