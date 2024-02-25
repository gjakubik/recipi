'use server'

import { db } from '@/lib/db'
import { ingredients } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uuidv4 } from '@/lib/db'

const markIngredients = async (ids: string[]) => {
  ids.forEach(async (id) => {
    await db
      .update(ingredients)
      .set({ processed: true })
      .where(eq(ingredients.id, id))
  })
}

export default markIngredients
