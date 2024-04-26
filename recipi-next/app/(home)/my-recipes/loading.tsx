import { LoadingRecipeList } from '@/components/recipe/LoadingRecipeList'
import { Typography } from '@/components/ui/typography'

export default function LoadingMyRecipes() {
  return (
    <>
      <div className="mt-4">{LoadingRecipeList}</div>
    </>
  )
}
