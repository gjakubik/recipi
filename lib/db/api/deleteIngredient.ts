import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const deleteIngredient = async (ingredientID: number) => {
  const ingredient = await db
    .delete(ingredients)
    .where(eq(ingredients.id, ingredientID))

  console.log(ingredient)

  return ingredient
}

export default deleteIngredient
