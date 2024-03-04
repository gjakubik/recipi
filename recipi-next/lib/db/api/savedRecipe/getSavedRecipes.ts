'use server'

import { db } from '@/lib/db'
import { Recipe } from '@/types'
import { savedRecipes } from '@/lib/db/schema'
import { getRecipe } from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { eq, desc } from 'drizzle-orm'

const getSavedRecipes = async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  const savedRecipesExec = await db
    .select()
    .from(savedRecipes)
    .where(eq(savedRecipes.userId, user.id))
    .orderBy(desc(savedRecipes.savedAt))

  const recipes = await Promise.all(
    savedRecipesExec.map(async (savedRecipe) => {
      const recipe = await getRecipe(savedRecipe.recipeId)
      return recipe
    })
  )

  return recipes.filter((recipe) => recipe !== undefined) as Recipe[]
}

export default getSavedRecipes
