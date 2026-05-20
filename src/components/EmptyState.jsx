function EmptyState({
  title = "Nothing Here",
  text = "No data available.",
  buttonText,
  onClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">

      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
        alt="Empty"
        className="w-40 mb-6 opacity-80"
      />

      <h1 className="text-3xl font-bold mb-3">
        {title}
      </h1>

      <p className="text-gray-500 max-w-md mb-6">
        {text}
      </p>

      {buttonText && (
        <button
          onClick={onClick}
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >

          {buttonText}

        </button>
      )}

    </div>
  )
}

export default EmptyState