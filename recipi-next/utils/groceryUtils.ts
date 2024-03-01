import convert, { Volume } from 'convert'
import { RecipeIngredient, MenuWithRecipes, CombinedIngredient } from '@/types'
import { abbToUnit, floatToFraction } from '@/lib/utils'

// I want to start with the list of ingredients from the menu
//

export const getIngredientsFromMenu = (
  menu: MenuWithRecipes
): RecipeIngredient[] => {
  const ingredients: RecipeIngredient[] = []

  if (!menu.recipeInfo) return ingredients

  menu.recipeInfo.forEach((recipe) => {
    recipe?.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient)
    })
  })

  return processIngredients(ingredients)
}

export const AddIngredients = (ingredient: CombinedIngredient) => {
  // Add all of the ingredients of the combined ingredient and set the amount and unit to the correct values
  let totalAmount = 0
  if (!ingredient.combined) return ingredient
  console.log('combining ingredients', ingredient)
  ingredient.ingredients.forEach((ing) => {
    if (ing.amount && ing.unit) {
      // Convert the amount to the unit of the first ingredient
      try {
        const convertedAmount = convert(
          parseFloat(ing.amount),
          // @ts-ignore
          ing.unit.toLowerCase()
          // @ts-ignore
        ).to(ingredient.unit?.toLowerCase())
        console.log(convertedAmount)

        // @ts-ignore
        totalAmount += convertedAmount
      } catch {
        console.log('failed to convert', ing.amount, ing.unit)
      }
    }
  })

  // @ts-ignore
  //const { quantity, unit } = convert(totalAmount, ingredient.unit).to('best')

  return {
    ...ingredient,
    amount: floatToFraction(totalAmount),
    // unit: abbToUnit(unit),
  }
}

export const processIngredients = (ingredients: RecipeIngredient[]) => {
  const processedIngredients: CombinedIngredient[] = []

  ingredients.forEach((ingredient) => {
    const existingIngredientIdx = processedIngredients.findIndex(
      (i) => i.name === ingredient.name
    )

    const existingIngredient = processedIngredients[existingIngredientIdx]

    if (existingIngredient) {
      if (existingIngredient.combined) {
        existingIngredient.ingredients.push(ingredient)
      } else {
        processedIngredients[existingIngredientIdx] = {
          ...existingIngredient,
          combined: true,
          ingredients: [existingIngredient, ingredient],
        }
      }
    } else {
      processedIngredients.push({
        ...ingredient,
        combined: false,
      })
    }
  })

  return processedIngredients.map((ingredient) => {
    return AddIngredients(ingredient)
  })
}
