import { LoadingCards } from '@/components/recipe/LoadingCards'
import { LoadingPagination } from '@/components/LoadingPagination'

export const LoadingRecipeList = (
  <div className="mt-4 flex flex-col gap-4">
    <LoadingPagination />
    {LoadingCards}
    <LoadingPagination withPageInfo />
  </div>
)
