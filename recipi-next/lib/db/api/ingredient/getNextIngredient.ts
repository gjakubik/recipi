'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { Ingredient } from '@/types'
import { eq, like, and, asc } from 'drizzle-orm'

const getNextIngredient = async (): Promise<Ingredient[] | undefined> => {
  // Get the next ingredient that has not been processed
  // Parse the description for the first phrase before a ,
  // Get all ingredients that have this same exact first phrase and are not processed

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
      fdc_id: ingredients.fdc_id,
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
  console.log(
    `ingredient phrase list: ${nextIngredientPhraseList}, hasComma? ${hasComma}`
  )
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
      fdc_id: ingredients.fdc_id,
    })
    .from(ingredients)
    .where(
      and(
        eq(ingredients.processed, false),
        nextIngredientPhrase
          ? like(
              ingredients.description,
              `${nextIngredientPhrase}${hasComma ? ',' : ''}%`
            )
          : undefined
      )
    )
  console.log('similar ingredients: ', similarIngredients)
  return similarIngredients
}

export default getNextIngredient
