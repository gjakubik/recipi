import { InferModel } from 'drizzle-orm'
import {
  categories,
  comments,
  ingredients,
  likes,
  recipes,
  users,
  sessions,
  verificationTokens,
  accounts,
  menus,
  featureFlags,
} from '../lib/db/schema'
import { FEATURE_FLAG_OPTIONS } from '../lib/constants'

export type FeatureFlagOtions = (typeof FEATURE_FLAG_OPTIONS)[number]

export type FeatureFlags = Record<FeatureFlagOtions, boolean>

export type FeatureFlag = InferModel<typeof featureFlags>

export type InsertFeatureFlag = InferModel<typeof featureFlags, 'insert'>

export type Menu = InferModel<typeof menus>

export type MenuWithRecipes = Menu & {
  author: User
  recipeInfo?: (Recipe | undefined)[]
}

export type InsertMenu = InferModel<typeof menus, 'insert'>

export type Category = InferModel<typeof categories>

export type Comment = InferModel<typeof comments>

export type Ingredient = InferModel<typeof ingredients>

export type IngredientPortion = {
  unit: string
  abbreviation?: string
  value?: number
  gram_weight?: number
  gram_per_unit?: number
}

export type InsertIngredient = InferModel<typeof ingredients, 'insert'>

export type RecipeIngredient = {
  name: string
  note?: string
  amount?: string
  unit?: string
}

export type CombinedIngredient = RecipeIngredient &
  (
    | {
        combined: true
        ingredients: RecipeIngredient[]
      }
    | { combined: false }
  )

export type RecipeIngredientForm = {
  id?: string | number
  name: string
  note?: string
  amount?: string
  unit?: string
}

export type Like = InferModel<typeof likes>

export type InsertLike = InferModel<typeof likes, 'insert'>

export type StoredFile = {
  key: string
  name: string
  url: string
  size: number
  caption?: string
}

export type Recipe = InferModel<typeof recipes> & {
  author: User
}

export type InsertRecipe = InferModel<typeof recipes, 'insert'>

export type RecipeForm = InsertRecipe

export type User = InferModel<typeof users>

export type InsertUser = InferModel<typeof users, 'insert'>

export type Session = InferModel<typeof sessions>

export type VerificationToken = InferModel<typeof verificationTokens>

export type Account = InferModel<typeof accounts>
