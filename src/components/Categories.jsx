import { Link } from "react-router-dom"

const categories = [
  {
    id: 1,
    name: "Men",
    description: "Tailored essentials and elevated casualwear.",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&h=1400&fit=crop",
  },
  {
    id: 2,
    name: "Women",
    description: "Soft silhouettes, dresses, and premium layering pieces.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=1400&fit=crop",
  },
  {
    id: 3,
    name: "Kids",
    description: "Comfortable looks for every day and special moments.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&h=1400&fit=crop",
  },
]

function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-8">
        <span className="text-sm uppercase tracking-[0.35em] text-slate-200">{category.name}</span>
        <h3 className="mt-4 text-3xl font-semibold text-white">{category.name}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-200">{category.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline">
          Shop {category.name}
        </span>
      </div>
    </Link>
  )
}

export default function Categories() {
  return (
    <section className="bg-white py-20 px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Categories</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">Browse our edit</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}