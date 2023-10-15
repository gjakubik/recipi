'use server'

import { db } from '@/lib/db'
import { recipes, ingredients } from '@/lib/db/schema'
import { Ingredient, RecipeForm } from '@/lib/types'
import { eq } from 'drizzle-orm'
import getRecipe from './getRecipe'
import getIngredient from './getIngredient'

const createRecipe = async (recipe: RecipeForm) => {
  const newRecipeExec = await db.insert(recipes).values({
    title: recipe.title,
    description: recipe.description,
    preparationTime: recipe.preparationTime,
    cookingTime: recipe.cookingTime,
    servings: recipe.servings,
    difficultyLevel: recipe.difficultyLevel,
    instructions: recipe.instructions,
    authorId: recipe.authorId,
  })

  const newRecipe = await getRecipe(parseInt(newRecipeExec.insertId))

  const ingredientsList: Ingredient[] = []
  recipe.ingredients?.forEach(async (ingredient) => {
    const newIngredientExec = await db.insert(ingredients).values({
      name: ingredient.name,
      note: ingredient.note,
      amount: ingredient.amount,
      unit: ingredient.unit,
      recipeId: newRecipe.id.toString(),
    })
    const newIngredient = await getIngredient(
      parseInt(newIngredientExec.insertId)
    )
    ingredientsList.push(newIngredient)
  })

  return {
    ...newRecipe,
    ingredients: ingredientsList,
  }
}

export default createRecipe
