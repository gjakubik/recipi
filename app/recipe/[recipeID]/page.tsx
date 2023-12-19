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
          <div className="flex flex-row gap-2">
            <Typography>Prep Time</Typography>
            <div className="pt-px">
              <Typography variant="light" className="pt-1">
                {timeValueToLabel(recipe.preparationTime) ||
                  recipe.preparationTime}
              </Typography>
            </div>
          </div>
        )}
        {!isZero(recipe.cookingTime) && (
          <div className="flex flex-row gap-2">
            <Typography>Cook Time</Typography>
            <div className="pt-px">
              <Typography variant="light" className="pt-1">
                {timeValueToLabel(recipe.cookingTime) || recipe.cookingTime}
              </Typography>
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2">
          <Typography>Servings</Typography>
          <div className="pt-px">
            <Typography variant="light" className="pt-1">
              {recipe.servings}
            </Typography>
          </div>
        </div>
      </div>
      <Typography>{recipe.description}</Typography>
      <Typography variant="h4">Ingredients</Typography>
      <IngredientsList ingredients={recipe.ingredients} />
      <Typography variant="h4">Instructions</Typography>
      <InstructionsList className="pl-2" instructions={recipe.instructions} />
    </>
  )
}
