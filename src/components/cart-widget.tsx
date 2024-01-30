'use client'

import { useCart } from '@/context/cart-context'
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { ShirtSizesChooser } from './shirt-sizes-chooser'

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
              let styleToBeAdded = ''

              if (index === 0) {
                styleToBeAdded = 'pb-8'
              } else if (index === items.length - 1) {
                styleToBeAdded = 'pt-8'
              } else {
                styleToBeAdded = 'py-8'
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
                    <span className="text-lg font-bold text-white">
                      {item.title}
                    </span>

                    <div>
                      <ShirtSizesChooser
                        index={index}
                        preChosenShirtSize={item.shirtSize}
                      />
                    </div>

                    <div className="flex justify-between items-center mr-5">
                      <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
                        {Number(item.price).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        })}
                      </span>

                      <button className="bg-transparent text-red-700 hover:text-red-900 transition-colors border-none outline-none">
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )
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
