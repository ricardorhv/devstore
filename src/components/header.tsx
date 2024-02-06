import Link from 'next/link'
import Image from 'next/image'
import CartWidget from './cart-widget'
import { SearchForm } from './search-form'
import { Suspense } from 'react'

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-col md:flex-row gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>

      <CartWidget />
    </div>
  )
}
