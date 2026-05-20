import { createContext, useState } from "react"
import toast from "react-hot-toast"
import { useEffect } from "react"


export const CartContext = createContext()

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // ADD TO CART

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {

      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )

      setCart(updatedCart)

      toast.success("Quantity updated")

      return
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ])

    toast.success("Added to cart")
  }

  // REMOVE FROM CART

  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    )

    toast.success("Removed from cart")
  }

  // INCREASE QUANTITY

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )

    setCart(updatedCart)
  }

  // DECREASE QUANTITY

  const decreaseQuantity = (id) => {

    const existingItem = cart.find(
      (item) => item.id === id
    )

    if (existingItem.quantity === 1) {

      removeFromCart(id)

      return
    }

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )

    setCart(updatedCart)
  }

  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }}
>
  {children}
</CartContext.Provider>
  )
}

export default CartProvider