'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { Ingredient } from '@/types'
import { like, asc, or, eq } from 'drizzle-orm'
import { uuidv4 } from '@/lib/db'

interface GetIngredients {
  search?: string
}

const getIngredients = async ({
  search,
}: GetIngredients): Promise<Ingredient[]> => {
  if (!search) {
    return await db
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
      .orderBy(asc(ingredients.description))
      .limit(100)
  }

  let searchStr
  try {
    searchStr = search
  } catch (error) {
    searchStr = undefined
  }

  return await db
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
    .where(
      or(
        search ? like(ingredients.description, `%${search}%`) : undefined,
        searchStr ? eq(ingredients.id, searchStr) : undefined
      )
    )
    .orderBy(asc(ingredients.description))
}

export default getIngredients
