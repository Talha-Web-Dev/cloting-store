function Testimonials() {

  const reviews = [
    {
      name: "Talha",
      review:
        "Amazing quality and premium design.",
    },

    {
      name: "Ahmed",
      review:
        "Best streetwear brand in Pakistan.",
    },

    {
      name: "Ali",
      review:
        "Loved the hoodie collection.",
    },
  ]

  return (
    <section className="px-8 py-20">

      <h1 className="text-5xl font-bold text-center mb-14">
        Customer Reviews
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {reviews.map((item, index) => (

          <div
            key={index}
            className="bg-white shadow-lg p-8 rounded-2xl"
          >

            <h2 className="text-2xl font-bold mb-4">
              {item.name}
            </h2>

            <p className="text-gray-500">
              {item.review}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Testimonials