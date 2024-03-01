'use server'

import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/session'
import { GetRecipesResult } from '@/types'
import { eq, sql, like, or, and, asc, desc } from 'drizzle-orm'

interface GetRecipes {
  search?: string
  authorId?: string
  sortBy?: 'title' | 'creationDate' | 'updatedAt'
  sort?: 'asc' | 'desc'
  limit?: number
  page?: number
}

const getRecipes = async ({
  search,
  authorId,
  sortBy,
  sort,
  limit = 10,
  page = 0,
}: GetRecipes): Promise<GetRecipesResult> => {
  const user = await getCurrentUser()
  return await db.transaction(async (tx) => {
    const recipeList = await tx
      .select({
        id: recipes.id,
        title: recipes.title,
        description: recipes.description,
        titleImage: recipes.titleImage,
        helperImages: recipes.helperImages,
        cookingTime: recipes.cookingTime,
        preparationTime: recipes.preparationTime,
        servings: recipes.servings,
        difficultyLevel: recipes.difficultyLevel,
        instructions: recipes.instructions,
        ingredients: recipes.ingredients,
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
      .limit(limit)
      .offset(page * limit)
      .where(
        and(
          or(
            search ? like(recipes.title, `%${search}%`) : undefined,
            search ? like(recipes.description, `%${search}%`) : undefined
          ),
          or(
            eq(recipes.isPrivate, false),
            user ? eq(recipes.authorId, user.id) : undefined
          ),
          authorId ? eq(recipes.authorId, authorId) : undefined
        )
      )
      .innerJoin(users, eq(recipes.authorId, users.id))
      .orderBy(
        sortBy && sortBy in recipes
          ? sort === 'asc'
            ? asc(recipes[sortBy])
            : desc(recipes[sortBy])
          : desc(recipes.updatedAt)
      )

    const countQuery = await tx
      .select({
        count: sql<number>`count(${recipes.id})`,
      })
      .from(recipes)
      .where(
        and(
          or(
            search ? like(recipes.title, `%${search}%`) : undefined,
            search ? like(recipes.description, `%${search}%`) : undefined
          ),
          authorId ? eq(recipes.authorId, authorId) : undefined
        )
      )

    const count = countQuery[0]?.count

    return {
      recipes: recipeList,
      count: count,
    }
  })
}

export default getRecipes
