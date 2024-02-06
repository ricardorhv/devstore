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

      <div className="grid grid-rows-6 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
        <Skeleton className="h-[600px]" />
      </div>
    </div>
  )
}
