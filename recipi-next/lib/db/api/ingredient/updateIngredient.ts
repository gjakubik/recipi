'use server'

import { db } from '@/lib/db'
import { InsertIngredient } from '@/types'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import getIngredient from './getIngredient'

const getIngredientUuid = async (description: string) => {
  const ingredient = await db
    .select({
      id: ingredients.id,
    })
    .from(ingredients)
    .where(eq(ingredients.description, description))
    .limit(1)

  if (!ingredient[0]) {
    throw new Error('Ingredient not found')
  }

  return ingredient[0].id
}

const updateIngredient = async (ingredient: InsertIngredient) => {
  if (
    ingredient.description == '' ||
    ingredient.description == undefined ||
    ingredient.description == null
  ) {
    throw new Error('Ingredient description cannot be empty')
  }

  await db
    .update(ingredients)
    .set({
      fdc_id: ingredient.fdc_id,
      description: ingredient.description,
      calories: ingredient.calories,
      protein: ingredient.protein,
      fat: ingredient.fat,
      carbs: ingredient.carbs,
      portions: ingredient.portions,
      processed: false,
    })
    .where(eq(ingredients.description, ingredient.description))
    .execute()

  const updatedIngredient = await getIngredient(
    await getIngredientUuid(ingredient.description)
  )

  return updatedIngredient
}

export default updateIngredient
