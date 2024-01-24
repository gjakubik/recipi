import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema'
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
        updated_at: users.updated_at,
        created_at: users.created_at,
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
