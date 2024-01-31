import { useCart } from '@/context/cart-context'
import { ProductCart } from '@/data/types/product-cart'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ShirtSizesChooser } from './shirt-sizes-chooser'

interface CartItemProps {
  item: ProductCart
  index: number
}
export function CarItem({ item, index }: CartItemProps) {
  const { removeItemFromCart, items } = useCart()
  let styleToBeAdded = ''

  if (index === 0) {
    styleToBeAdded = 'pb-8'
  } else if (index === items.length - 1) {
    styleToBeAdded = 'pt-8'
  } else {
    styleToBeAdded = 'py-8'
  }

  function handleRemoveItem() {
    removeItemFromCart(item.id)
  }

  return (
    <div
      className={`grid grid-cols-[140px_1fr] gap-3 items-center ${styleToBeAdded}`}
      key={item.id}
    >
      <div className="relative">
        <Image src={item.image} alt="" width={140} height={140} />
        {item.quantity > 1 && (
          <div className="absolute bg-emerald-500 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center right-9 bottom-[-8px]">
            <span>{item.quantity}x</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-lg font-bold text-white">{item.title}</span>

        <div>
          <ShirtSizesChooser
            index={index}
            preChosenShirtSize={item.shirtSize}
            productId={item.id}
          />
        </div>

        <div className="flex justify-between items-center mr-5">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {Number(item.subtotal).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>

          <button
            onClick={handleRemoveItem}
            className="bg-transparent text-red-700 hover:text-red-900 transition-colors border-none outline-none"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
