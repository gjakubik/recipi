'use server'

import { db } from '@/lib/db'
import { savedRecipes } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/session'
import { eq, and } from 'drizzle-orm'

interface IsSavedRecipe {
  recipeId: number
}

const isSavedRecipe = async ({ recipeId }: IsSavedRecipe) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  const savedRecipe = await db
    .select()
    .from(savedRecipes)
    .where(
      and(eq(savedRecipes.userId, user.id), eq(savedRecipes.recipeId, recipeId))
    )
  return savedRecipe.length > 0
}

export default isSavedRecipe
