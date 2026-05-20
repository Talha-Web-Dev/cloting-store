import { createContext, useEffect, useState } from "react"

export const WishlistContext = createContext()

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    const existingItem = wishlist.find((item) => item.id === product.id)

    if (existingItem) {
      return
    }

    setWishlist([
      ...wishlist,
      product,
    ])
  }

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id)

    if (exists) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const isInWishlist = (id) => wishlist.some((item) => item.id === id)

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistProvider
