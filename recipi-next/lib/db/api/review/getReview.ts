'use server'

import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema-pg'
import { eq } from 'drizzle-orm'

const getReview = async (id: number) => {
  const review = await db.select().from(reviews).where(eq(reviews.id, id))

  return review[0]
}

export default getReview
