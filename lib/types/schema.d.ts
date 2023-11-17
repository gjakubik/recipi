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
} from '../db/schema'

export type Category = InferModel<typeof categories>

export type Comment = InferModel<typeof comments>

export type Ingredient = InferModel<typeof ingredients>

// recipeId is not required because it is automatically added by the database
export type InsertIngredient = Omit<
  InferModel<typeof ingredients, 'insert'>,
  'recipeId'
>

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
  instructions: string[] | null
}

export type InsertRecipe = InferModel<typeof recipes, 'insert'>

export type RecipeForm = InsertRecipe & {
  ingredients?: InsertIngredient[]
}

export type User = InferModel<typeof users>

export type InsertUser = InferModel<typeof users, 'insert'>

export type Session = InferModel<typeof sessions>

export type VerificationToken = InferModel<typeof verificationTokens>

export type Account = InferModel<typeof accounts>
