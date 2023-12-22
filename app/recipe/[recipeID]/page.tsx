import { getRecipe } from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { timeValueToLabel, parseInstructions, isZero } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { IngredientsList } from '@/components/IngredientsList'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { InstructionsList } from '@/components/InstructoinsList'
import { Clock, Users } from 'lucide-react'

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
        <div className="flex flex-row gap-4">
          {user?.id === recipe.authorId && (
            <>
              <Button asChild>
                <Link href={`/recipe/${recipe.id}/edit`}>Edit</Link>
              </Button>
              <AlertDialog>
                <Button variant="destructive" asChild>
                  <AlertDialogTrigger>Delete</AlertDialogTrigger>
                </Button>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the recipe.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
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
