'use server'

import { db } from '@/lib/db'
import { reviews, users } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

const getRecipeReviews = async (recipeId: string) => {
  const reviewsExec = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      text: reviews.text,
      postedAt: reviews.postedAt,
      updatedAt: reviews.updatedAt,
      recipeId: reviews.recipeId,
      userId: reviews.userId,
      name: users.name,
      image: users.image,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.recipeId, recipeId))
    .orderBy(desc(reviews.postedAt))

  return reviewsExec
}

export default getRecipeReviews
