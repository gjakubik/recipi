'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { InsertIngredient } from '@/types'
import getIngredient from './getIngredient'
import { v4 as uuidv4 } from 'uuid'
import { eq } from 'drizzle-orm'

const createIngredient = async (ingredient: InsertIngredient) => {
  console.log('creating ing')
  const uuid = createUuid()

  if (
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
      .where(eq(ingredients.id, uuid))
      .limit(1)
  ) {
    throw new Error(`Ingredient with id: ${uuid} already exists`)
  }

  const newIngredientExec = await db.insert(ingredients).values({
    id: uuid,
    description: ingredient.description,
    calories: ingredient.calories,
    protein: ingredient.protein,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
    portions: ingredient.portions,
    fdc_id: ingredient.fdc_id,
  })

  const newIngredient = await getIngredient(newIngredientExec.insertId)

  return newIngredient
}

const createUuid = () => {
  return uuidv4()
}

export default createIngredient
