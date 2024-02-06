import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })
  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid lg:max-h-[860px] grid-cols-8 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-8 row-span-2 md:col-span-8 md:row-span-4 lg:col-span-5 lg:row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
        />

        <div className="absolute right-1/2 bottom-10 translate-x-1/2 md:translate-x-0 md:bottom-28 md:right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          href={`/product/${product.slug}`}
          className="group relative col-span-8 row-span-2 md:col-span-4 md:row-span-2 lg:col-span-3 lg:row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          key={product.id}
        >
          <Image
            src={product.image}
            alt=""
            className="group-hover:scale-105 transition-transform duration-500"
            width={920}
            height={920}
            quality={100}
          />

          <div className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-10 bottom-10 md:right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>

            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
