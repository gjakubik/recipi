'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'
import { RecipeForm } from '@/lib/types'
import { eq } from 'drizzle-orm'
import getRecipe from './getRecipe'

const updateRecipe = async (recipe: RecipeForm) => {
  if (!recipe.id) {
    throw new Error('Recipe ID is required')
  }

  await db
    .update(recipes)
    .set({
      title: recipe.title,
      description: recipe.description,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficultyLevel: recipe.difficultyLevel,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      authorId: recipe.authorId,
    })
    .where(eq(recipes.id, recipe.id))
    .execute()

  const updatedRecipe = await getRecipe(recipe.id)

  return updatedRecipe
}

export default updateRecipe
