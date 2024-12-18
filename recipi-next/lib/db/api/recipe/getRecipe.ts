'use server'

import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema-pg'
import { Recipe } from '@/types'
import { eq } from 'drizzle-orm'

const getRecipe = async (recipeID: number): Promise<Recipe | undefined> => {
  try {
    const recipe = await db
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
      .innerJoin(users, eq(recipes.authorId, users.id))
      .where(eq(recipes.id, recipeID))
      .limit(1)

    if (!recipe[0]) {
      throw new Error('Recipe not found')
    }

    return recipe[0]
  } catch (error) {
    console.log(error)
    return
  }
}

export default getRecipe
