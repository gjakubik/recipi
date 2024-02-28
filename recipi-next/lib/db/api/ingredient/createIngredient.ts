'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { InsertIngredient } from '@/types'
import getIngredient from './getIngredient'
import { v4 as uuidv4 } from 'uuid'
import { eq } from 'drizzle-orm'

const createIngredient = async (ingredient: InsertIngredient) => {
  const uuid = createUuid()

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
        .where(eq(ingredients.id, uuid))
    ).length > 0
  ) {
    throw new Error(`Ingredient with id: ${uuid} already exists`)
  }

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
    throw new Error(
      `Ingredient with description: ${ingredient.description} already exists`
    )
  }

  const newIngredientExec = await db.insert(ingredients).values({
    id: uuid,
    description: ingredient.description,
    calories: ingredient.calories ? ingredient.calories : 0,
    protein: ingredient.protein ? ingredient.protein : 0,
    fat: ingredient.fat ? ingredient.fat : 0,
    carbs: ingredient.carbs ? ingredient.carbs : 0,
    portions: ingredient.portions?.map((portion) => ({
      unit: portion.unit,
      abbreviation: portion.abbreviation,
      value: portion.value ? portion.value : 0,
      gram_weight: portion.gram_weight ? portion.gram_weight : 0,
      gram_per_unit: portion.gram_per_unit ? portion.gram_per_unit : 0,
    })),
    fdc_id: ingredient.fdc_id ? ingredient.fdc_id : 0,
  })

  console.log('about to insert new ingredient: ', newIngredientExec)
  const newIngredient = await getIngredient(uuid)

  return newIngredient
}

const createUuid = () => {
  return uuidv4()
}

export default createIngredient
