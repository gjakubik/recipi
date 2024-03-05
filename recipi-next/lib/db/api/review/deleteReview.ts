'use server'

import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const deleteReview = async (id: number) => {
  await db.delete(reviews).where(eq(reviews.id, id))
}

export default deleteReview
