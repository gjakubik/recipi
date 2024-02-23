'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { Ingredient } from '@/types'
import { like, asc, or, eq } from 'drizzle-orm'

interface GetIngredients {
  search?: string
}

const getIngredients = async ({
  search,
}: GetIngredients): Promise<Ingredient[]> => {
  console.log('search', search)
  console.log('typeof search', typeof search)
  if (!search) {
    return await db
      .select({
        id: ingredients.id,
        description: ingredients.description,
        calories: ingredients.calories,
        protein: ingredients.protein,
        fat: ingredients.fat,
        carbs: ingredients.carbs,
      })
      .from(ingredients)
      .orderBy(asc(ingredients.description))
      .limit(100)
  }

  let searchInt
  try {
    searchInt = parseInt(search)
  } catch (error) {
    searchInt = undefined
  }

  return await db
    .select({
      id: ingredients.id,
      description: ingredients.description,
      calories: ingredients.calories,
      protein: ingredients.protein,
      fat: ingredients.fat,
      carbs: ingredients.carbs,
    })
    .from(ingredients)
    .where(
      or(
        search ? like(ingredients.description, `%${search}%`) : undefined,
        searchInt ? eq(ingredients.id, searchInt) : undefined
      )
    )
    .orderBy(asc(ingredients.description))
}

export default getIngredients
