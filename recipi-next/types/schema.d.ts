import { InferModel } from 'drizzle-orm'
import {
  categories,
  reviews,
  ingredients,
  likes,
  recipes,
  users,
  sessions,
  verificationTokens,
  accounts,
  menus,
  featureFlags,
  savedRecipes,
  plans,
  webhookEvents,
  subscriptions,
} from '../lib/db/schema-pg'
import { FEATURE_FLAG_OPTIONS } from '../lib/constants'

export type NewWebhookEvent = InferModel<typeof webhookEvents, 'insert'>

export type NewSubscription = InferModel<typeof subscriptions, 'insert'>

export type NewPlan = InferModel<typeof plans, 'insert'>

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

export type Review = InferModel<typeof reviews>

export type ReviewWithUser = Review & {
  name: string | null
  image: string | null
}

export type InsertReview = InferModel<typeof reviews, 'insert'>

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
  db_uuid?: string
  db_name?: string
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

export type InsertSavedRecipe = InferModel<typeof savedRecipes, 'insert'>

export type User = InferModel<typeof users>

export type InsertUser = InferModel<typeof users, 'insert'>

export type Session = InferModel<typeof sessions>

export type VerificationToken = InferModel<typeof verificationTokens>

export type Account = InferModel<typeof accounts>
