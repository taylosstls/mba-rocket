import { Suspense } from 'react'

import { Skeleton } from '@/components/skeleton'
import { CurrentSearch } from './current-search'

export default function SearchLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-[400px]" />
        ))}
      </div>
    </div>
  )
}
