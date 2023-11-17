import { db } from '@/lib/db'
import { recipes, ingredients } from '@/lib/db/schema'
import { parseInstructions } from '@/lib/utils'
import { eq } from 'drizzle-orm'

const getRecipe = async (recipeID: number) => {
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
        instructions: recipes.instructions,
        creationDate: recipes.creationDate,
        updatedAt: recipes.updatedAt,
        authorId: recipes.authorId,
      })
      .from(recipes)
      .where(eq(recipes.id, recipeID))
      .limit(1)

    const allIngredients = await db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        note: ingredients.note,
        amount: ingredients.amount,
        unit: ingredients.unit,
        recipeId: ingredients.recipeId,
      })
      .from(ingredients)
      .where(eq(ingredients.recipeId, recipeID.toString()))

    const fullRecipe = {
      ...recipe[0],
      ingredients: allIngredients,
    }

    console.log(fullRecipe)

    return fullRecipe
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export default getRecipe
