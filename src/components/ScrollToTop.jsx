import { ArrowUp } from "lucide-react"

function ScrollToTop() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg"
    >

      <ArrowUp />

    </button>
  )
}

export default ScrollToTop
