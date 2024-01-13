import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getRecipe, getMenus } from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { timeValueToLabel, isZero } from '@/lib/utils'
import { MENU_QUERY } from '@/lib/constants'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { IngredientsList } from '@/components/recipe/IngredientsList'
import { InstructionsList } from '@/components/recipe/InstructionsList'
import { AddRecipeToMenusModal } from '@/components/modals/AddRecipeToMenusModal'
import { Clock, Users } from 'lucide-react'
import { RecipeActionsDropdown } from './RecipeActionsDropdown'

interface RecipePageProps {
  params: { recipeID: string }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const user = await getCurrentUser()
  const recipe = await getRecipe(parseInt(params.recipeID))
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  if (!recipe) {
    redirect('/')
  }

  return (
    <>
      <div className="flex flex-row justify-between justify-items-center w-full">
        <Typography variant="h3">{recipe.title}</Typography>
        <div className="flex flex-row gap-4">
          {!!user && (
            <AddRecipeToMenusModal
              user={user}
              recipe={recipe}
              initialMenus={initialMenus}
            >
              <Button>Add To Menu</Button>
            </AddRecipeToMenusModal>
          )}
          {user?.id === recipe.authorId && (
            <RecipeActionsDropdown user={user} recipe={recipe} />
          )}
        </div>
        {/* <div className="flex flex-row gap-4">
          {user?.id === recipe.authorId && (
            <>
              <Button asChild>
                <Link href={`/recipe/${recipe.id}/edit`}>Edit</Link>
              </Button>
              <DeleteRecipeButton recipeId={recipe.id} />
            </>
          )}
        </div> */}
      </div>
      <div className="flex flex-col gap-0">
        {!isZero(recipe.preparationTime) && (
          <div className="flex flex-row items-center gap-2">
            <Clock className="w-4 h-4" />
            <Typography variant="bold">Prep</Typography>
            <Typography variant="pn" className="pt-px">
              {timeValueToLabel(recipe.preparationTime) ||
                recipe.preparationTime}
            </Typography>
          </div>
        )}
        {!isZero(recipe.cookingTime) && (
          <div className="flex flex-row items-center gap-2">
            <Clock className="w-4 h-4" />
            <Typography variant="bold">Cook</Typography>
            <Typography variant="pn" className="pt-px">
              {timeValueToLabel(recipe.cookingTime) || recipe.cookingTime}
            </Typography>
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <Users className="w-4 h-4" />
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
