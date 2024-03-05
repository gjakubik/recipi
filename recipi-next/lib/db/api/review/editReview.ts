'use server'

import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import getReview from './getReview'

interface UpdateReview {
  id: number
  rating: number
  text: string
}

const editReview = async ({ id, rating, text }: UpdateReview) => {
  await db
    .update(reviews)
    .set({
      rating,
      text,
    })
    .where(eq(reviews.id, id))

  const review = await getReview(id)

  return review
}

export default editReview
