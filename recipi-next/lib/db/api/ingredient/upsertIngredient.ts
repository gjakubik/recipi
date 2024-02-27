'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { InsertIngredient } from '@/types'
import getIngredient from './getIngredient'
import { v4 as uuidv4 } from 'uuid'
import { eq } from 'drizzle-orm'
import updateIngredient from './updateIngredient'
import createIngredient from './createIngredient'

const upsertIngredient = async (ingredient: InsertIngredient) => {
  if (
    ingredient.description == '' ||
    ingredient.description == undefined ||
    ingredient.description == null
  ) {
    throw new Error('Ingredient description cannot be empty')
  }

  if (
    (
      await db
        .select({
          id: ingredients.id,
          fdc_id: ingredients.fdc_id,
          description: ingredients.description,
          calories: ingredients.calories,
          protein: ingredients.protein,
          fat: ingredients.fat,
          carbs: ingredients.carbs,
          portions: ingredients.portions,
          processed: ingredients.processed,
        })
        .from(ingredients)
        .where(eq(ingredients.description, ingredient.description))
    ).length > 0
  ) {
    return await updateIngredient(ingredient)
  }
  return await createIngredient(ingredient)
}

export default upsertIngredient
