import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const deleteRecipe = async (id: number) => {
  await db.delete(recipes).where(eq(recipes.id, id)).execute()
}

export default deleteRecipe
