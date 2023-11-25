import { getCurrentUser } from '@/lib/session'
import { useParams } from 'next/navigation'
import { RecipeFormValues } from '@/lib/validations/recipe'
import { getRecipe } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'
import { RecipeForm } from '@/components/forms/RecipeForm'

interface EditRecipePageProps {
  params: { recipeID: string }
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const user = await getCurrentUser()
  const { recipeID } = params

  const recipe = await getRecipe(parseInt(recipeID))

  //redirect to home if not logged in
  if (!user) {
    return <Typography>Please log in to create a recipe</Typography>
  }

  if (!recipe) {
    return <Typography>Recipe not found</Typography>
  }

  return (
    <>
      <Typography variant="h2">Edit Recipe</Typography>
      <RecipeForm
        user={user}
        initialValues={
          {
            ...recipe,
            instructions: recipe.instructions?.map((instruction, index) => ({
              id: index,
              instruction,
            })),
          } as RecipeFormValues
        }
      />
    </>
  )
}
