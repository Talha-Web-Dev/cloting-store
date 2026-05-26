import { Star } from "lucide-react"

function Testimonials() {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Fashion Enthusiast",
      review: "The quality and attention to detail is exceptional. Every piece feels premium.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Aarav Singh",
      role: "Style Influencer",
      review: "Lush Stitches captures modern luxury perfectly. I'm a loyal customer now.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Ananya Patel",
      role: "Professional",
      review: "Perfect blend of comfort and style. These pieces work for office and casual outings.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Rahul Verma",
      role: "Streetwear Enthusiast",
      review: "The hoodie collection is next level. Worth every penny.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 transition duration-500 dark:text-slate-100">
      <div className="mb-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Loved by customers
        </p>
        <h2 className="mt-3 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
          Customer Reviews & Testimonials
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          Hear from our community of premium fashion lovers around the world.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950"
          >
            {/* Rating Stars */}
            <div className="mb-4 flex gap-1">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Review Text */}
            <p className="mb-6 flex-1 text-slate-600 dark:text-slate-400 leading-relaxed">
              "{item.review}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials