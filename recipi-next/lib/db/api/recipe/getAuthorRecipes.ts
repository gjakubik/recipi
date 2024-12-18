'use server'

import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema-pg'
import { getCurrentUser } from '@/lib/session'
import { eq, and, or } from 'drizzle-orm'

interface GetAuthorRecipes {
  userId: string
}

const getAuthorRecipes = async ({ userId }: GetAuthorRecipes) => {
  const user = await getCurrentUser()
  const allRecipes = await db
    .select({
      id: recipes.id,
      title: recipes.title,
      titleImage: recipes.titleImage,
      helperImages: recipes.helperImages,
      description: recipes.description,
      preparationTime: recipes.preparationTime,
      cookingTime: recipes.cookingTime,
      servings: recipes.servings,
      difficultyLevel: recipes.difficultyLevel,
      ingredients: recipes.ingredients,
      instructions: recipes.instructions,
      rating: recipes.rating,
      isPrivate: recipes.isPrivate,
      creationDate: recipes.creationDate,
      updatedAt: recipes.updatedAt,
      authorId: recipes.authorId,
      author: {
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        role: users.role,
        updatedAt: users.updatedAt,
        createdAt: users.createdAt,
        emailVerified: users.emailVerified,
      },
    })
    .from(recipes)
    .where(
      and(
        eq(recipes.authorId, userId),
        or(
          eq(recipes.isPrivate, false),
          user ? eq(recipes.authorId, user.id) : undefined
        )
      )
    )
    .innerJoin(users, eq(recipes.authorId, users.id))

  return allRecipes
}

export default getAuthorRecipes
