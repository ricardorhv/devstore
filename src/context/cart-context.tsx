'use client'

import { Product } from '@/data/types/product'
import { ProductCart } from '@/data/types/product-cart'
import { ShirtSizesType } from '@/data/types/shirt-sizes-type'
import { ReactNode, createContext, useContext, useState } from 'react'

interface CartContextType {
  items: ProductCart[]
  addToCart: (product: ProductCart) => void
  removeItemFromCart: (productId: number) => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ProductCart[]>([])

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
          },
        ]
      }
    })
  }

  function removeItemFromCart(productId: number) {
    setCartItems((prevState) => {
      return prevState.filter((item) => item.id !== productId)
    })
  }

  return (
    <CartContext.Provider
      value={{ items: cartItems, addToCart, removeItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
