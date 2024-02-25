'use server'

import { db } from '@/lib/db'
import { InsertIngredient } from '@/types'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import getIngredient from './getIngredient'

const updateIngredient = async (ingredient: InsertIngredient) => {
  if (!ingredient.id) {
    throw new Error('Ingredient ID is required')
  }

  await db
    .update(ingredients)
    .set({
      id: ingredient.id,
      fdc_id: ingredient.fdc_id,
      description: ingredient.description,
      calories: ingredient.calories,
      protein: ingredient.protein,
      fat: ingredient.fat,
      carbs: ingredient.carbs,
      portions: ingredient.portions,
      processed: false,
    })
    .where(eq(ingredients.id, ingredient.id))
    .execute()

  const updatedIngredient = await getIngredient(ingredient.id)

  return updatedIngredient
}

export default updateIngredient
