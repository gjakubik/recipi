import { Recipe } from '@/types'
import { timeInSeconds } from '@/lib/utils'
import { parseServings } from '@/utils/servings'

export function recipeSearchFilter(search: string | null) {
  return (recipe: Recipe) => {
    if (!search) return true

    const searchLower = search.toLowerCase()
    const inTitle = recipe.title.toLowerCase().includes(searchLower)
    const inIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.name.toLowerCase().includes(searchLower)
    )
    const inInstructions = recipe.instructions.some((instruction) =>
      instruction.toLowerCase().includes(searchLower)
    )
    const inDescription = recipe.description
      ?.toLowerCase()
      .includes(searchLower)
    const inAuthor = recipe.author.name?.toLowerCase().includes(searchLower)

    return (
      inTitle || inIngredients || inInstructions || inDescription || inAuthor
    )
  }
}

export function recipeFilterUnderMaxPrepTime(maxPrepTime: string) {
  return (recipe: Recipe) => {
    if (maxPrepTime === 'INF') return true
    const maxPrepSeconds = timeInSeconds(maxPrepTime)
    const prepTimeSeconds = timeInSeconds(recipe.preparationTime)

    return prepTimeSeconds <= maxPrepSeconds
  }
}

export function recipeFilterUnderMaxCookTime(maxCookTime: string) {
  return (recipe: Recipe) => {
    if (maxCookTime === 'INF') return true
    const maxCookSeconds = timeInSeconds(maxCookTime)
    const cookTimeSeconds = timeInSeconds(recipe.cookingTime)

    return cookTimeSeconds <= maxCookSeconds
  }
}

export function recipeFilterDifficultyLevel(difficultyLevels: string[]) {
  return (recipe: Recipe) => {
    if (difficultyLevels.length === 0) return true

    return difficultyLevels.includes(recipe.difficultyLevel)
  }
}

export function recipeFilterServings(minServings: number, maxServings: number) {
  return (recipe: Recipe) => {
    const [min, max] = parseServings(recipe.servings)

    // If any of the ranges overlap, return true
    return (
      (min >= minServings && min <= maxServings) ||
      (max >= minServings && max <= maxServings) ||
      (min <= minServings && max >= maxServings)
    )
  }
}
