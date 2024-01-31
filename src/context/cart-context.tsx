'use client'

import { ProductCart } from '@/data/types/product-cart'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Cart {
  cartItems: ProductCart[]
  total: number
}

interface CartContextType {
  items: ProductCart[]
  cart: Cart
  addToCart: (product: ProductCart) => void
  removeItemFromCart: (productId: number) => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ProductCart[]>([])
  const [cart, setCart] = useState<Cart>({} as Cart)

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.subtotal || 1)
    }, 0)
    setCart({ cartItems, total })
  }, [cartItems])

  function addToCart(product: ProductCart) {
    setCartItems((prevState) => {
      const productInCart = prevState.some((item) => item.id === product.id)

      if (productInCart) {
        return prevState.map((item) => {
          if (item.id === product.id) {
            const newQuantity = item.quantity + 1

            return {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity,
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
            subtotal: product.price * product.quantity,
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
      value={{ items: cartItems, addToCart, removeItemFromCart, cart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
