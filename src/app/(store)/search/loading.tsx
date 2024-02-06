'use client'

import { Skeleton } from '@/components/skeleton'
import { CurrentSearch } from './current-search'
import { Suspense } from 'react'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-rows-6 md:grid-cols-3 gap-6">
        <Skeleton className="h-[600px] md:h-[300px]" />
        <Skeleton className="h-[600px] md:h-[300px]" />
        <Skeleton className="h-[600px] md:h-[300px]" />
        <Skeleton className="h-[600px] md:h-[300px]" />
        <Skeleton className="h-[600px] md:h-[300px]" />
        <Skeleton className="h-[600px] md:h-[300px]" />
      </div>
    </div>
  )
}
