'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  productId: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: string) => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: string) {
    setCartItems((prevState) => {
      const productInCart = prevState.some(
        (item) => item.productId === productId,
      )

      if (productInCart) {
        return prevState.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      } else {
        return [
          ...prevState,
          {
            productId,
            quantity: 1,
          },
        ]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
