import { Recipe, MenuWithRecipes } from './schema'

export type GetRecipesResult = {
  recipes: Recipe[]
  count: number
}

export type GetMenusResult = {
  menus: MenuWithRecipes[]
  count: number
}
