'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const deleteIngredient = async (id: number) => {
  await db.delete(ingredients).where(eq(ingredients.id, id))
}

export default deleteIngredient