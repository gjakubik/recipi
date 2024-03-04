'use server'

import { db } from '@/lib/db'
import { savedRecipes } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/session'
import { eq, and } from 'drizzle-orm'

interface UnsaveRecipe {
  recipeId: number
}

const unsaveRecipe = async ({ recipeId }: UnsaveRecipe) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  await db
    .delete(savedRecipes)
    .where(
      and(eq(savedRecipes.userId, user.id), eq(savedRecipes.recipeId, recipeId))
    )

  return
}

export default unsaveRecipe
