function Button({
  children,
  className,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button