'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { InsertIngredient } from '@/types'
import getIngredient from './getIngredient'
// import { uuidv4 } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

const createIngredient = async (ingredient: InsertIngredient) => {
  const newIngredientExec = await db.insert(ingredients).values({
    id: ingredient.id ? ingredient.id : createUuid(),
    fdc_id: ingredient.fdc_id,
    description: ingredient.description,
    calories: ingredient.calories,
    protein: ingredient.protein,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
    portions: ingredient.portions,
  })

  const newIngredient = await getIngredient(newIngredientExec.insertId)

  return newIngredient
}

const createUuid = () => {
  return uuidv4()
}

export default createIngredient
