import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  async function searchProducts(query: string): Promise<Product[]> {
    const response = await api(`/products/search?q=${query}`, {
      next: {
        revalidate: 60 * 60,
      },
    })
    const products = await response.json()

    return products
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className={`grid grid-rows-${products.length} gap-6`}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              alt=""
              className="group-hover:scale-105 transition-transform duration-500"
              width={480}
              height={480}
              quality={100}
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
    </div>
  )
}
