import { db } from '@/lib/db'
import { recipes, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const getAllRecipes = async () => {
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
    .innerJoin(users, eq(recipes.authorId, users.id))

  console.log(allRecipes)

  return allRecipes
}

export default getAllRecipes
