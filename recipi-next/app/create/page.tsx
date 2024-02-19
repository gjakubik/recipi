import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { RecipeForm } from '@/components/forms/RecipeForm'
import LoadingCreatePage from './loading'

export const maxDuration = 90 //Allow these functions to run longer, as AI may take a while to process

export default async function CreateRecipePage() {
  const user = await getCurrentUser()
  //TODO: Add some sort of check if the user has created a recipe before, if not show some modal showing off the AI features

  //redirect to home if not logged in
  if (!user) {
    return <Typography>Please log in to create a recipe</Typography>
  }

  return (
    <>
      <Typography variant="h2">Create Recipe</Typography>
      <RecipeForm user={user} />
    </>
  )
}
