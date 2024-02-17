import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export const LoadingPaginationNumber = () => (
  <Skeleton className="w-[36px] h-[36px]" />
)

export const LoadingPaginationButton = () => (
  <Skeleton className="w-[80px] h-[36px]" />
)

interface LoadingPaginationProps {
  withPageInfo?: boolean
}

export const LoadingPagination = ({ withPageInfo }: LoadingPaginationProps) => (
  <div className="flex flex-row items-center justify-between w-full">
    {withPageInfo ? (
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="w-[72px] h-[28px]" />
        <Separator orientation="vertical" className="h-[36px]" />
        <Skeleton className="w-[150px] h-[28px]" />
      </div>
    ) : (
      <div />
    )}
    <div className="flex flex-row items-center gap-1">
      <LoadingPaginationNumber />
      <LoadingPaginationNumber />
      <LoadingPaginationNumber />
      <LoadingPaginationButton />
    </div>
  </div>
)
