import { redirect } from 'next/navigation'
import _ from 'lodash'
import Link from 'next/link'
import {
  getRecipe,
  getMenus,
  isSavedRecipe,
  getRecipeReviews,
  getUserMenus,
} from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { timeValueToLabel, isZero } from '@/lib/utils'
import { MENU_QUERY } from '@/lib/constants'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { IngredientsList } from '@/components/recipe/IngredientsList'
import { InstructionsList } from '@/components/recipe/InstructionsList'
import { AddRecipeToMenusModal } from '@/components/modals/AddRecipeToMenusModal'
import { RecipeActionsDropdown } from './RecipeActionsDropdown'
import { RecipePrivacyButton } from './RecipePrivacyButton'
import { SaveUnsaveButton } from './SaveUnsaveButton'
import { AddReview } from '@/components/reviews/AddReview'
import { ReviewList } from '@/components/reviews/ReviewList'
import { Clock, Users, GraduationCap } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

interface RecipePageProps {
  params: { recipeID: string }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const user = await getCurrentUser()
  const recipe = await getRecipe(parseInt(params.recipeID))
  const reviews = await getRecipeReviews(params.recipeID)
  const menus = await getUserMenus(user?.id)
  const isSaved = user
    ? await isSavedRecipe({ recipeId: parseInt(params.recipeID) })
    : false

  const hasReviewed = reviews.some((review) => review.userId === user?.id)

  if (!recipe) {
    redirect('/')
  }

  return (
    <>
      <div className="flex w-full flex-col justify-between justify-items-center gap-2 sm:flex-row">
        <div className="flex flex-col">
          <Typography variant="extralight" className="">
            {recipe.isPrivate ? 'Secret' : 'Public'}
          </Typography>
          <Typography variant="h3">{recipe.title}</Typography>
          <Typography variant="light">
            By{' '}
            <Link
              href={`/profile/${recipe.authorId}/recipes`}
              className="underline"
            >
              {recipe.author.name}
            </Link>
          </Typography>
          {recipe.updatedAt && (
            <Typography variant="light">
              Updated: {recipe.updatedAt?.toLocaleDateString()}
            </Typography>
          )}
        </div>

        <div className="flex flex-row gap-4">
          {!!user && (
            <AddRecipeToMenusModal
              user={user}
              recipe={recipe}
              menus={menus}
              paramNames={{
                page: 'menuPage',
                limit: 'menuLimit',
                search: 'menuSearch',
              }}
            >
              <Button className="min-w-[121px]">Add To Menu</Button>
            </AddRecipeToMenusModal>
          )}
          {user?.id === recipe.authorId && (
            <div className="flex flex-row">
              <RecipePrivacyButton recipe={recipe} />
              <RecipeActionsDropdown user={user} recipe={recipe} />
            </div>
          )}
          {user && user.id !== recipe.authorId && (
            <SaveUnsaveButton isSaved={isSaved} recipeId={recipe.id} />
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {recipe.titleImage?.url && (
          <img
            src={recipe.titleImage.url}
            alt={recipe.title}
            className="fill h-28 w-28 rounded-md object-cover"
          />
        )}
        <div className="flex flex-col gap-0">
          <div className="flex flex-row items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <Typography variant="bold">Difficulty</Typography>
            <Typography variant="pn" className="pt-px">
              {_.capitalize(recipe.difficultyLevel)}
            </Typography>
          </div>
          {!isZero(recipe.preparationTime) && (
            <div className="flex flex-row items-center gap-2">
              <Clock className="h-4 w-4" />
              <Typography variant="bold">Prep</Typography>
              <Typography variant="pn" className="pt-px">
                {timeValueToLabel(recipe.preparationTime) ||
                  recipe.preparationTime}
              </Typography>
            </div>
          )}
          {!isZero(recipe.cookingTime) && (
            <div className="flex flex-row items-center gap-2">
              <Clock className="h-4 w-4" />
              <Typography variant="bold">Cook</Typography>
              <Typography variant="pn" className="pt-px">
                {timeValueToLabel(recipe.cookingTime) || recipe.cookingTime}
              </Typography>
            </div>
          )}
          <div className="flex flex-row items-center gap-2">
            <Users className="h-4 w-4" />
            <Typography variant="bold">Servings</Typography>
            <Typography variant="pn" className="pt-px">
              {recipe.servings}
            </Typography>
          </div>
        </div>
      </div>
      <Typography>{recipe.description}</Typography>
      <Typography variant="h4">Ingredients</Typography>
      <IngredientsList ingredients={recipe.ingredients} v2 />
      <Typography variant="h4">Instructions</Typography>
      <InstructionsList className="pl-2" instructions={recipe.instructions} />
      {user && !hasReviewed && <AddReview recipeId={params.recipeID} />}
      {reviews.length > 0 && <Typography variant="h4">Reviews</Typography>}
      <ReviewList user={user} reviews={reviews} />
    </>
  )
}
