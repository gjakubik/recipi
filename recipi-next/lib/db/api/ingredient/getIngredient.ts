'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { Ingredient } from '@/types'
import { eq } from 'drizzle-orm'

const getIngredient = async (id: number): Promise<Ingredient | undefined> => {
  try {
    const ingredient = await db
      .select({
        id: ingredients.id,
        description: ingredients.description,
        calories: ingredients.calories,
        protein: ingredients.protein,
        fat: ingredients.fat,
        carbs: ingredients.carbs,
        processed: ingredients.processed,
      })
      .from(ingredients)
      .where(eq(ingredients.id, id))
      .limit(1)

    if (!ingredient[0]) {
      throw new Error('Ingredient not found')
    }

    return ingredient[0]
  } catch (error) {
    console.log(error)
    return
  }
}

export default getIngredient
