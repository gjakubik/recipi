'use server'

import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema'
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

    return {
      recipes: recipeList,
      count: recipeList.length,
    }
  })
}

export default getExploreRecipes
