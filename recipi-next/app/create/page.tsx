import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { RecipeForm } from '@/components/forms/RecipeForm'

export const maxDuration = 90

export default async function CreateRecipePage() {
  const user = await getCurrentUser()

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
