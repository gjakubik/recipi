'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema-pg'
import { RecipeForm } from '@/types'
import getIngredients from '../ingredient/getIngredients'

const createRecipe = async (recipe: RecipeForm) => {
  // stub out to wire together ingredients db and ingredients in recipe
  for (const ingredient of recipe.ingredients ? recipe.ingredients : []) {
    if (ingredient.name) {
      let db_ings = await getIngredients({ search: ingredient.name })
      console.log(db_ings)
    }
  }

  const newRecipe = await db
    .insert(recipes)
    .values({
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
    .returning({ insertedId: recipes.id })

  if (!newRecipe) {
    throw new Error('Failed to create recipe')
  }

  return newRecipe
}

export default createRecipe
