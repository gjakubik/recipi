import { db } from '@/lib/db'
import { recipes } from '@/lib/db/schema'

const getRecipe = async () => {
  const allRecipes = await db
    .select({
      id: recipes.id,
      title: recipes.title,
      description: recipes.description,
      preparationTime: recipes.preparationTime,
      cookingTime: recipes.cookingTime,
      servings: recipes.servings,
      difficultyLevel: recipes.difficultyLevel,
      instructions: recipes.instructions,
      creationDate: recipes.creationDate,
      authorId: recipes.authorId,
    })
    .from(recipes)

  console.log(allRecipes)

  return allRecipes
}

export default getRecipe
