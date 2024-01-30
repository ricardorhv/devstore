'use client'

import { Product } from '@/data/types/product'
import { ShirtSizesType } from '@/data/types/shirt-sizes-type'
import { ReactNode, createContext, useContext, useState } from 'react'

interface ProductCart extends Product {
  shirtSize: ShirtSizesType
}

interface CartItem extends ProductCart {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: ProductCart) => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: ProductCart) {
    setCartItems((prevState) => {
      const productInCart = prevState.some((item) => item.id === product.id)

      if (productInCart) {
        return prevState.map((item) => {
          if (item.id === product.id) {
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
            ...product,
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
