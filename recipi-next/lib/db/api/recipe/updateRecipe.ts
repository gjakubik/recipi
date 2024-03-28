'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema-pg'
import { RecipeForm } from '@/types'
import { eq } from 'drizzle-orm'
import getRecipe from './getRecipe'
import getIngredients from '../ingredient/getIngredients'
import { IngredientPortion } from '@/types'

const updateRecipe = async (recipe: RecipeForm) => {
  if (!recipe.id) {
    throw new Error('Recipe ID is required')
  }

  // // ----------- stub out to wire together ingredients db and ingredients in recipe ------------
  // let best_matches: [string, { name: string; diff: number }][] = []
  // for (const ingredient of recipe.ingredients ? recipe.ingredients : []) {
  //   let db_ings: {
  //     id: string
  //     description: string | null
  //     calories: number | null
  //     protein: number | null
  //     fat: number | null
  //     carbs: number | null
  //     portions: IngredientPortion[]
  //     processed: boolean | null
  //     fdc_id: number
  //   }[] = []
  //   if (ingredient.name) {
  //     db_ings = await getIngredients({ search: ingredient.name })
  //     console.log(db_ings.map((i) => i.description))
  //   }

  //   let diffs = db_ings.map((i) => {
  //     let diff = 0
  //     if (!i.description) {
  //       return { name: i.id, diff: 999 }
  //     }
  //     for (let j = 0; j < i.description.length; j++) {
  //       if (
  //         i.description[j].toLowerCase() != ingredient.name[j]?.toLowerCase()
  //       ) {
  //         diff++
  //       }
  //     }
  //     return { name: i.description, diff: diff }
  //   })
  //   let best_match = diffs?.reduce((prev, current) =>
  //     prev.diff < current.diff ? prev : current
  //   )
  //   best_matches.push([ingredient.name ? ingredient.name : 'N/A', best_match])
  //   console.log(
  //     `ingredient: ${ingredient.name}`,
  //     `best match -- name: ${best_match.name}, diff: ${best_match.diff}`
  //   )
  // }

  console.log('recipe.ingredients', recipe.ingredients)

  await db
    .update(recipes)
    .set({
      title: recipe.title,
      titleImage: recipe.titleImage,
      helperImages: recipe.helperImages,
      description: recipe.description,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficultyLevel: recipe.difficultyLevel,
      ingredients: recipe.ingredients,
      isPrivate: recipe.isPrivate,
      instructions: recipe.instructions,
      authorId: recipe.authorId,
    })
    .where(eq(recipes.id, recipe.id))
    .execute()

  const updatedRecipe = await getRecipe(recipe.id)

  return updatedRecipe
}

export default updateRecipe
