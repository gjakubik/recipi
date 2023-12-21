import { getRecipe } from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { timeValueToLabel, parseInstructions, isZero } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { IngredientsList } from '@/components/IngredientsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InstructionsList } from '@/components/InstructoinsList'

interface RecipePageProps {
  params: { recipeID: string }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const user = await getCurrentUser()
  const recipe = await getRecipe(parseInt(params.recipeID))

  console.log(recipe)

  if (!recipe) {
    return <Typography>Recipe not found</Typography>
  }

  return (
    <>
      <div className="flex flex-row justify-between justify-items-center w-full">
        <Typography variant="h3">{recipe.title}</Typography>
        {user?.id === recipe.authorId && (
          <Button asChild>
            <Link href={`/recipe/${recipe.id}/edit`}>Edit</Link>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-0">
        {!isZero(recipe.preparationTime) && (
          <div className="flex flex-row items-center gap-2">
            <Typography variant="bold">Prep Time</Typography>
            <Typography variant="pn" className="pt-px">
              {timeValueToLabel(recipe.preparationTime) ||
                recipe.preparationTime}
            </Typography>
          </div>
        )}
        {!isZero(recipe.cookingTime) && (
          <div className="flex flex-row items-center gap-2">
            <Typography variant="bold">Cook Time</Typography>
            <Typography variant="pn" className="pt-px">
              {timeValueToLabel(recipe.cookingTime) || recipe.cookingTime}
            </Typography>
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <Typography variant="bold">Servings</Typography>
          <Typography variant="pn" className="pt-px">
            {recipe.servings}
          </Typography>
        </div>
      </div>
      <Typography>{recipe.description}</Typography>
      <Typography variant="h4">Ingredients</Typography>
      <IngredientsList ingredients={recipe.ingredients} v2 />
      <Typography variant="h4">Instructions</Typography>
      <InstructionsList className="pl-2" instructions={recipe.instructions} />
    </>
  )
}
