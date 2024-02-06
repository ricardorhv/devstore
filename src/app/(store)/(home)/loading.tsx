import { Skeleton } from '@/components/skeleton'

export default function HomeLoading() {
  return (
    <div className="grid h-full grid-cols-8 grid-rows-6 gap-6">
      <Skeleton className="col-span-8 row-span-2 md:col-span-5 md:row-span-6 h-[500px] md:h-[856px]" />

      <Skeleton className="col-span-8 row-span-2 md:col-span-3 md:row-span-3 h-[500px]" />
      <Skeleton className="col-span-8 row-span-2 md:col-span-3 md:row-span-3 h-[500px]" />
    </div>
  )
}
