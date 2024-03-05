'use server'

import { db } from '@/lib/db'
import { savedRecipes } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/session'

interface SaveRecipe {
  recipeId: number
}

const saveRecipe = async ({ recipeId }: SaveRecipe) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  await db.insert(savedRecipes).values({
    userId: user.id,
    recipeId,
  })

  return
}

export default saveRecipe
