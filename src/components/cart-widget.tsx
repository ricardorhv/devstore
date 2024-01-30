'use client'

import { useCart } from '@/context/cart-context'
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingBag, X } from 'lucide-react'
import { CarItem } from './cart-item'

export default function CartWidget() {
  const { items } = useCart()

  const quantityOfItemsInCart = items.length

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          <span className="text-sm">Cart ({quantityOfItemsInCart})</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/90 animate-overlayShow" />
        <Dialog.Content className="bg-zinc-900 fixed inset-y-0 right-0 w-[600px] px-8 py-6 h-full animate-cartShow data-[state=closed]:animate-cartHide">
          <header className="flex items-start justify-between">
            <Dialog.Title className="text-zinc-200 text-[32px] font-bold">
              Sacola de compras
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="text-zinc-500 bg-transparent">
                <X size={24} />
              </button>
            </Dialog.Close>
          </header>

          <hr className="rounded-full mt-5 mb-8" />

          <section className="h-1/2 overflow-y-scroll divide-y divide-zinc-700">
            {items.map((item, index) => {
              return <CarItem item={item} index={index} key={item.id} />
            })}
          </section>

          <hr className="rounded-full my-8" />

          <footer>
            <div className="flex items-center justify-between my-8">
              <span className="text-zinc-400 text-lg font-bold">Total</span>
              <div className="text-center">
                <span className="block text-white font-bold text-xl">
                  R$ 519,00
                </span>
                <span className="text-zinc-400 text-sm">
                  Em 12x s/juros de R$43,50
                </span>
              </div>
            </div>

            <button className="flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white w-full">
              Finalizar compra
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
