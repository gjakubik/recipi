'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { Ingredient } from '@/types'
import { like, asc, or, eq, and } from 'drizzle-orm'

interface GetIngredients {
  search?: string
  get_all?: boolean
}
// TODO add 'or' version to this and control with that bool
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

  search = search.replaceAll(',', ' ')
  let search_list = search.trim().split(' ')
  console.log(`SEARCH LIST: ${search_list}`)
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
        search
          ? and(
              ...search_list.map((i) => like(ingredients.description, `%${i}%`))
            )
          : undefined,
        searchStr ? eq(ingredients.id, searchStr) : undefined
      )
    )
    .orderBy(asc(ingredients.description))
}

export default getIngredients
