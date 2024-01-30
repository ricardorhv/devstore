'use client'

import { useCart } from '@/context/cart-context'
import { FormEvent } from 'react'

interface AddToCartButtonProps {
  productId: number
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddProductToCart() {
    addToCart(productId)
  }

  function handleOnSubmit(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log(event.target.shirtSize.value)
  }

  return (
    <button
      type="submit"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  )
}
