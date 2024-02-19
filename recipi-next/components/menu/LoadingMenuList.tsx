import { Skeleton } from '@/components/ui/skeleton'
import { LoadingPagination } from '@/components/LoadingPagination'

export const LoadingMenuItem = (
  <div className="flex w-full flex-row items-center justify-between gap-4 hover:cursor-pointer sm:grid sm:grid-cols-[1fr_auto] ">
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_auto]">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-[140px_90px] items-center">
        <Skeleton className="h-6 w-[130px]" />
        <Skeleton className="h-6 w-[70px]" />
      </div>
    </div>
    <Skeleton className="h-8 w-8" />
  </div>
)

export const LoadingMenuList = (
  <div className="flex flex-col gap-6">
    <LoadingPagination />
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i}>{LoadingMenuItem}</div>
      ))}
    </div>
    <LoadingPagination withPageInfo />
  </div>
)
