import { Recipe, MenuWithRecipes, Ingredient } from './schema'

export type GetRecipesResult = {
  recipes: Recipe[]
  count: number
}

export type GetMenusResult = {
  menus: MenuWithRecipes[]
  count: number
}

export type GetIngredientsResult = {
  ingredients: Ingredient[]
  count: number
}
