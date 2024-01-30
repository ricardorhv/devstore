'use client'
import { FormEvent, useState } from 'react'
import { ShirtSizesChooser } from './shirt-sizes-chooser'
import { useCart } from '@/context/cart-context'
import { Product } from '@/data/types/product'
import { ShirtSizesType } from '@/data/types/shirt-sizes-type'

interface FormDataType {
  shirtSize?: {
    value: string
  }
}

interface AddToCartFormProps {
  product: Product
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [isShirtSizeNotChoose, setIsShirtSizeNotChoose] = useState(false)
  const { addToCart } = useCart()

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = event.target as FormDataType
    const shirtSize = formData.shirtSize?.value as ShirtSizesType

    if (shirtSize?.length === 0) {
      setIsShirtSizeNotChoose(true)
    } else {
      setIsShirtSizeNotChoose(false)
      addToCart({
        ...product,
        shirtSize,
      })
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mt-8 space-y-4">
        <ShirtSizesChooser index={-2} />
        {isShirtSizeNotChoose && (
          <span className="text-sm text-red-800">
            Escolha um tamanho antes!
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      >
        Adicionar ao carrinho
      </button>
    </form>
  )
}
