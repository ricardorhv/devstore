'use client'

import { Cart } from '@/data/types/cart'
import { ProductCart } from '@/data/types/product-cart'
import { ShirtSizesType } from '@/data/types/shirt-sizes-type'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface CartContextType {
  items: ProductCart[]
  cart: Cart
  addToCart: (product: ProductCart) => void
  removeItemFromCart: (productId: number, shirtSize: ShirtSizesType) => void
  changeShirtSize: (
    productId: number,
    preChosenSize: ShirtSizesType,
    newSize: ShirtSizesType,
  ) => void
  clearCart: () => void
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
    console.log(cartItems)

    setCart({ cartItems, total })
  }, [cartItems])

  function addToCart(product: ProductCart) {
    setCartItems((prevState) => {
      const productInCart = prevState.some(
        (item) =>
          item.id === product.id && item.shirtSize === product.shirtSize,
      )

      if (productInCart) {
        return prevState.map((item) => {
          if (item.id === product.id && item.shirtSize === product.shirtSize) {
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

  function removeItemFromCart(productId: number, shirtSize: ShirtSizesType) {
    setCartItems((prevState) =>
      prevState.filter(
        (item) =>
          item.id !== productId ||
          (item.id === productId && item.shirtSize !== shirtSize),
      ),
    )
  }

  function verifyIfExistsTheSameProductWithTheSameNewSize(
    productId: number,
    newSize: ShirtSizesType,
  ) {
    return cartItems.some(
      (item) => item.id === productId && item.shirtSize === newSize,
    )
  }

  function increaseTheQuantity(productId: number) {
    setCartItems((prevState) => {
      return prevState.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + 1
          return {
            ...item,
            quantity: newQuantity,
            subtotal: item.price * newQuantity,
          }
        }
        return item
      })
    })
  }

  function changeShirtSize(
    productId: number,
    preChosenSize: ShirtSizesType,
    newSize: ShirtSizesType,
  ) {
    if (verifyIfExistsTheSameProductWithTheSameNewSize(productId, newSize)) {
      removeItemFromCart(productId, preChosenSize)
      increaseTheQuantity(productId)
    } else {
      setCartItems((prevState) => {
        return prevState.map((item) => {
          if (item.id === productId && item.shirtSize === preChosenSize) {
            return {
              ...item,
              shirtSize: newSize,
            }
          }
          return item
        })
      })
    }
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeItemFromCart,
        cart,
        changeShirtSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
