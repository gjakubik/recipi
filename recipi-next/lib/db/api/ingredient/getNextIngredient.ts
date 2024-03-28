'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema-pg'
import { Ingredient } from '@/types'
import { eq, like, and, asc, or } from 'drizzle-orm'

const getNextIngredient = async (
  get_and = true
): Promise<Ingredient[] | undefined> => {
  // Get the next ingredient that has not been processed
  // Parse the description for the first phrase before a ,
  // Get all ingredients that have this same exact first phrase and are not processed
  const joinFunc = get_and ? and : or

  const nextIngredientRes = await db
    .select({
      id: ingredients.id,
      description: ingredients.description,
      calories: ingredients.calories,
      protein: ingredients.protein,
      fat: ingredients.fat,
      carbs: ingredients.carbs,
      portions: ingredients.portions,
      processed: ingredients.processed,
      fdcId: ingredients.fdcId,
    })
    .from(ingredients)
    .where(eq(ingredients.processed, false))
    .orderBy(asc(ingredients.description))
    .limit(1)

  if (!nextIngredientRes[0]) {
    return
  }

  const nextIngredient = nextIngredientRes[0]

  const nextIngredientPhraseList = nextIngredient.description?.split(',')
  const hasComma = (nextIngredientPhraseList?.length || 0) > 1
  const nextIngredientPhrase = nextIngredientPhraseList?.[0]

  const similarIngredients = await db
    .select({
      id: ingredients.id,
      description: ingredients.description,
      calories: ingredients.calories,
      protein: ingredients.protein,
      fat: ingredients.fat,
      carbs: ingredients.carbs,
      portions: ingredients.portions,
      processed: ingredients.processed,
      fdcId: ingredients.fdcId,
    })
    .from(ingredients)
    .where(
      joinFunc(
        eq(ingredients.processed, false),
        nextIngredientPhrase
          ? like(
              ingredients.description,
              `${nextIngredientPhrase}${hasComma ? ',' : ''}%`
            )
          : undefined
      )
    )

  return similarIngredients
}

export default getNextIngredient
