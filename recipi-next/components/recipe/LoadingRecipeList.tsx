import { WideLoadingCards } from '@/components/recipe/LoadingCards'
import { LoadingPagination } from '@/components/LoadingPagination'
import { Skeleton } from '../ui/skeleton'

export const LoadingRecipeList = (
  <div className="mt-4 flex flex-col gap-4">
    <div className="flex flex-row flex-wrap gap-2">
      <Skeleton className="h-9 min-w-[200px] flex-grow" />
      <Skeleton className="h-9 w-[100px]" />
      <Skeleton className="h-9 w-[160px]" />
      <Skeleton className="h-9 w-[100px]" />
    </div>
    <LoadingPagination />
    {WideLoadingCards}
    <LoadingPagination withPageInfo />
  </div>
)
