import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'

const getRecipe = async () => {
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
      instructions: recipes.instructions,
      creationDate: recipes.creationDate,
      updatedAt: recipes.updatedAt,
      authorId: recipes.authorId,
    })
    .from(recipes)

  console.log(allRecipes)

  return allRecipes
}

export default getRecipe
