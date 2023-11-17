'use server'

import { db } from '@/lib/db'
import { recipes, ingredients } from '@/lib/db/schema'
import { Ingredient, RecipeForm } from '@/lib/types'
import { eq } from 'drizzle-orm'
import getRecipe from './getRecipe'
import getIngredient from './getIngredient'

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
      instructions: recipe.instructions,
      authorId: recipe.authorId,
    })
    .where(eq(recipes.id, recipe.id))
    .execute()

  await db
    .delete(ingredients)
    .where(eq(ingredients.recipeId, recipe.id.toString()))
    .execute()

  const ingredientsList: Ingredient[] = []
  for (const ingredient of recipe.ingredients || []) {
    const newIngredientExec = await db
      .insert(ingredients)
      .values({
        name: ingredient.name,
        note: ingredient.note,
        amount: ingredient.amount,
        unit: ingredient.unit,
        recipeId: recipe.id.toString(),
      })
      .execute()
    const newIngredient = await getIngredient(
      parseInt(newIngredientExec.insertId)
    )
    ingredientsList.push(newIngredient)
  }

  const updatedRecipe = await getRecipe(recipe.id)

  return {
    ...updatedRecipe,
    ingredients: ingredientsList,
  }
}

export default updateRecipe
