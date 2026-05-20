function Newsletter() {
  return (
    <section className="bg-black text-white py-20 px-8 text-center">

      <h1 className="text-5xl font-bold mb-4">
        Join Our Newsletter
      </h1>

      <p className="text-gray-400 mb-8">
        Get updates about new collections.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-4">

        <input
          type="email"
          placeholder="Enter your email"
          className="px-6 py-3 rounded-xl text-black w-full md:w-96"
        />

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">

          Subscribe

        </button>

      </div>

    </section>
  )
}

export default Newsletter