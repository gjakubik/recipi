'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'
import { RecipeForm } from '@/types'
import getRecipe from './getRecipe'

const createRecipe = async (recipe: RecipeForm) => {
  const newRecipeExec = await db.insert(recipes).values({
    title: recipe.title,
    titleImage: recipe.titleImage,
    helperImages: recipe.helperImages,
    description: recipe.description,
    preparationTime: recipe.preparationTime,
    cookingTime: recipe.cookingTime,
    servings: recipe.servings,
    difficultyLevel: recipe.difficultyLevel,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    isPrivate: recipe.isPrivate,
    authorId: recipe.authorId,
  })

  const newRecipe = await getRecipe(parseInt(newRecipeExec.insertId))

  if (!newRecipe) {
    throw new Error('Failed to create recipe')
  }

  return newRecipe
}

export default createRecipe
