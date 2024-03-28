'use server'

import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema-pg'
import { getCurrentUser } from '@/lib/session'
import { GetRecipesResult } from '@/types'
import { ne, eq, sql, like, or, and, asc, desc } from 'drizzle-orm'

interface GetExploreRecipes {
  search?: string
}

const getExploreRecipes = async ({
  search,
}: GetExploreRecipes): Promise<GetRecipesResult> => {
  const user = await getCurrentUser()

  const recipeList = await db
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
        or(
          like(recipes.title, `%${search}%`),
          like(recipes.description, `%${search}%`)
        ),
        user?.id ? ne(recipes.authorId, user.id) : undefined,
        eq(recipes.isPrivate, false)
      )
    )
    .innerJoin(users, eq(recipes.authorId, users.id))
    .orderBy(asc(recipes.creationDate))
    .execute()

  return {
    recipes: recipeList,
    count: recipeList.length,
  }
}

export default getExploreRecipes
