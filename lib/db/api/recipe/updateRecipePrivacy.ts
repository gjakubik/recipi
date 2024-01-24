'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import getRecipe from './getRecipe'

const updateRecipePrivacy = async (recipeId: number, isPrivate: boolean) => {
  if (!recipeId) {
    throw new Error('Recipe ID is required')
  }

  await db
    .update(recipes)
    .set({
      isPrivate,
    })
    .where(eq(recipes.id, recipeId))
    .execute()

  const updatedRecipe = await getRecipe(recipeId)

  return updatedRecipe
}

export default updateRecipePrivacy
