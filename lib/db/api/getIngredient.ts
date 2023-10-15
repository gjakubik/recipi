import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const getIngredient = async (ingredientID: number) => {
  const ingredient = await db
    .select({
      id: ingredients.id,
      name: ingredients.name,
      note: ingredients.note,
      amount: ingredients.amount,
      unit: ingredients.unit,
      recipeId: ingredients.recipeId,
    })
    .from(ingredients)
    .where(eq(ingredients.id, ingredientID))
    .limit(1)

  console.log(ingredient)

  return ingredient[0]
}

export default getIngredient
