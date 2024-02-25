'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const deleteIngredient = async (id: string) => {
  await db.delete(ingredients).where(eq(ingredients.id, id))
}

export default deleteIngredient
