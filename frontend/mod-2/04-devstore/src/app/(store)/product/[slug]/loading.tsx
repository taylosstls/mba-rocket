import { Skeleton } from '@/components/skeleton'

export default function HomeLoading() {
  return (
    <div className="relative grid w-full max-h-[860px] grid-cols-1 lg:grid-cols-3 gap-12">
      <Skeleton className="col-span-3 lg:col-span-2 overflow-hidden min-h-[50vh] lg:h-[100vh] lg:max-h-[860px]" />
      <Skeleton className="col-span-3 lg:col-span-1 min-h-[50vh]" />
    </div>
  )
}
