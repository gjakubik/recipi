'use server'

import { db } from '@/lib/db'
import { reviews, recipes } from '@/lib/db/schema'
import { InsertReview } from '@/types/schema'
import { eq } from 'drizzle-orm'

const createReview = async (review: InsertReview) => {
  const reviewExec = await db.insert(reviews).values(review).execute()

  // Now that we have created the review, we should update the recipe average rating
  const recipeId = review.recipeId
  const recipeReviews = await db
    .select({ rating: reviews.rating })
    .from(reviews)
    .where(eq(reviews.recipeId, recipeId))
    .execute()
  const totalRating = recipeReviews.reduce((acc, curr) => acc + curr.rating, 0)
  const averageRating = totalRating / recipeReviews.length
  console.log('averageRating', averageRating)
  await db
    .update(recipes)
    .set({ rating: averageRating })
    .where(eq(recipes.id, parseInt(recipeId)))

  return reviewExec.insertId
}

export default createReview
