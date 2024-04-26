import { LoadingRecipeList } from '@/components/recipe/LoadingRecipeList'
import { Typography } from '@/components/ui/typography'

export default function LoadinSavedRecipes() {
  return (
    <>
      <div className="mt-4">{LoadingRecipeList}</div>
    </>
  )
}
