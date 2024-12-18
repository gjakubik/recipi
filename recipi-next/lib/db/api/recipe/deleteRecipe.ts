'use server'

import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema-pg'
import { eq } from 'drizzle-orm'

const deleteRecipe = async (id: number) => {
  await db.delete(recipes).where(eq(recipes.id, id))
}

export default deleteRecipe
