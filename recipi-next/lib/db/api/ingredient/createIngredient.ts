'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { InsertIngredient } from '@/types'
import getIngredient from './getIngredient'

const createIngredient = async (ingredient: InsertIngredient) => {
  const newIngredientExec = await db.insert(ingredients).values({
    description: ingredient.description,
    calories: ingredient.calories,
    protein: ingredient.protein,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
  })

  const newIngredient = await getIngredient(
    parseInt(newIngredientExec.insertId)
  )

  return newIngredient
}

export default createIngredient
