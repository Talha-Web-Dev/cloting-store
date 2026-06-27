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
    <section className="bg-brand-bg py-24 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Loved by customers</p>
          <h2 className="mt-3 text-4xl font-semibold text-brand-charcoal sm:text-5xl">
            Customer reviews that feel like editorial praise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
            Read reflections from modern shoppers who trust Lush & Stitches for quality and style.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-[2rem] border border-brand-border bg-white p-8 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex gap-1 text-brand-gold">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              <p className="mb-6 flex-1 text-sm leading-7 text-brand-muted">"{item.review}"</p>

              <div className="flex items-center gap-3 border-t border-brand-border pt-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-brand-charcoal">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials