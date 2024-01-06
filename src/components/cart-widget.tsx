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

          <section className="border-y border-white h-[500px] divide-y divide-zinc-700 ">
            <div className="grid grid-cols-[140px_1fr] gap-3 py-8 items-center">
              <Image
                src={'/moletom-ai-side.png'}
                alt=""
                width={140}
                height={140}
              />

              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold text-white">
                  Moletom AI Side
                </span>

                <div>
                  <ShirtSizesChooser preChosenShirtSize="M" />
                </div>

                <div className="flex justify-between items-center">
                  <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
                    {Number(129).toLocaleString('pt-BR', {
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
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
