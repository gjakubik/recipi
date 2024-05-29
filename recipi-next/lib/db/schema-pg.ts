import {
  pgTable,
  index,
  unique,
  varchar,
  text,
  integer,
  timestamp,
  serial,
  boolean,
  doublePrecision,
  json,
  jsonb,
} from 'drizzle-orm/pg-core'
import { RecipeIngredient, StoredFile, IngredientPortion } from '@/types'

export const accounts = pgTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    idToken: text('id_token'),
    refreshToken: text('refresh_token'),
    scope: varchar('scope', { length: 255 }),
    tokenType: varchar('token_type', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
    sessionState: varchar('session_state', { length: 255 }),
  },
  (table) => {
    return {
      userIdIdx: index('account_userId_idx').on(table.userId),
      accountProviderProviderAccountIdKey: unique(
        'account_provider_providerAccountId_key'
      ).on(table.provider, table.providerAccountId),
    }
  }
)

export const featureFlags = pgTable('featureFlag', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  isActive: boolean('isActive').default(false).notNull(),
})

export const ingredients = pgTable(
  'ingredients',
  {
    id: varchar('id', { length: 36 }).primaryKey().notNull(),
    description: varchar('description', { length: 255 }),
    calories: doublePrecision('calories'),
    protein: doublePrecision('protein'),
    fat: doublePrecision('fat'),
    carbs: doublePrecision('carbs'),
    processed: boolean('processed').default(false),
    portions: json('portions')
      .$type<IngredientPortion[]>()
      .default([])
      .notNull(),
    fdcId: integer('fdc_id').default(0).notNull(),
  },
  (table) => {
    return {
      descriptionIdx: index('ingredients_description_idx').on(
        table.description
      ),
      processedIdx: index('ingredients_processed_idx').on(table.processed),
      idIdx: index('ingredients_id_idx').on(table.id),
    }
  }
)

export const likes = pgTable(
  'likes',
  {
    id: serial('id').primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('likes_user_id_idx').on(table.userId),
      recipeIdIdx: index('likes_recipe_id_idx').on(table.recipeId),
    }
  }
)

export const menus = pgTable(
  'menus',
  {
    id: serial('id').primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    recipes: json('recipes').$type<number[] | undefined>(),
    creationDate: timestamp('creation_date', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      authorIdIdx: index('menus_author_id_idx').on(table.authorId),
    }
  }
)

export const recipeTags = pgTable(
  'recipe_tags',
  {
    id: serial('id').primaryKey().notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    tagId: varchar('tag_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index('recipe_tags_recipe_id_idx').on(table.recipeId),
      tagIdIdx: index('recipe_tags_tag_id_idx').on(table.tagId),
    }
  }
)

export const recipes = pgTable(
  'recipes',
  {
    id: serial('id').primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    preparationTime: varchar('preparation_time').default('00:00:00').notNull(),
    cookingTime: varchar('cooking_time').default('00:00:00').notNull(),
    servings: varchar('servings', { length: 50 }).notNull(),
    difficultyLevel: varchar('difficulty_level', { length: 50 }).notNull(),
    instructions: json('instructions').$type<string[]>().notNull(),
    creationDate: timestamp('creation_date', { mode: 'date' })
      .defaultNow()
      .notNull(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
    titleImage: json('title_image').$type<StoredFile | null>(),
    helperImages: json('helper_images').$type<StoredFile[] | null>(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
    ingredients: json('ingredients')
      .$type<RecipeIngredient[]>()
      .default([])
      .notNull(),
    isPrivate: boolean('isPrivate').default(false).notNull(),
    rating: integer('rating').default(0).notNull(),
  },
  (table) => {
    return {
      authorIdIdx: index('recipes_author_id_idx').on(table.authorId),
      privateIdx: index('recipes_isPrivate_idx').on(table.isPrivate),
      titleIdx: index('recipes_title_idx').on(table.title),
      preparationTimeIdx: index('recipes_preparation_time_idx').on(
        table.preparationTime
      ),
      cookingTimeIdx: index('recipes_cooking_time_idx').on(table.cookingTime),
      servingsIdx: index('recipes_servings_idx').on(table.servings),
      difficultyLevelIdx: index('recipes_difficulty_level_idx').on(
        table.difficultyLevel
      ),
      creationDateIdx: index('recipes_creation_date_idx').on(
        table.creationDate
      ),
      updatedAtIdx: index('recipes_updated_at_idx').on(table.updatedAt),
    }
  }
)

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    rating: integer('rating').default(0).notNull(),
    text: text('text'),
    postedAt: timestamp('posted_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('reviews_user_id_idx').on(table.userId),
      recipeIdIdx: index('reviews_recipe_id_idx').on(table.recipeId),
      updatedAtIdx: index('reviews_updated_at_idx').on(table.updatedAt),
    }
  }
)

export const savedRecipes = pgTable(
  'saved_recipes',
  {
    id: serial('id').primaryKey().notNull(),
    recipeId: integer('recipe_id').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    savedAt: timestamp('saved_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index('saved_recipes_recipe_id_idx').on(table.recipeId),
      userIdIdx: index('saved_recipes_user_id_idx').on(table.userId),
      savedAtIdx: index('saved_recipes_saved_at_idx').on(table.savedAt),
    }
  }
)

export const sessions = pgTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .primaryKey()
      .notNull(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index('session_userId_idx').on(table.userId),
    }
  }
)

export const tags = pgTable(
  'tags',
  {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameIdx: index('tags_name_idx').on(table.name),
      tagsNameKey: unique('tags_name_key').on(table.name),
    }
  }
)

export const users = pgTable(
  'user',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'string' }),
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
    role: varchar('role', { length: 255 }).default('basic'),
  },
  (table) => {
    return {
      userEmailKey: unique('user_email_key').on(table.email),
    }
  }
)

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).primaryKey().notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => {
    return {
      verificationTokenTokenKey: unique('verificationToken_token_key').on(
        table.token
      ),
    }
  }
)

export const plans = pgTable('plan', {
  id: serial('id').primaryKey(),
  productId: integer('productId').notNull(),
  productName: text('productName'),
  variantId: integer('variantId').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  interval: text('interval'),
  intervalCount: integer('intervalCount'),
  trialInterval: text('trialInterval'),
  trialIntervalCount: integer('trialIntervalCount'),
  sort: integer('sort'),
})

export const webhookEvents = pgTable('webhookEvent', {
  id: integer('id').primaryKey(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  eventName: text('eventName').notNull(),
  processed: boolean('processed').default(false),
  body: jsonb('body').notNull(),
  processingError: text('processingError'),
})

export const subscriptions = pgTable('subscription', {
  id: serial('id').primaryKey(),
  lemonSqueezyId: text('lemonSqueezyId').unique().notNull(),
  orderId: integer('orderId').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  status: text('status').notNull(),
  statusFormatted: text('statusFormatted').notNull(),
  renewsAt: text('renewsAt'),
  endsAt: text('endsAt'),
  trialEndsAt: text('trialEndsAt'),
  price: text('price').notNull(),
  isUsageBased: boolean('isUsageBased').default(false),
  isPaused: boolean('isPaused').default(false),
  subscriptionItemId: serial('subscriptionItemId'),
  userId: text('userId').notNull(),
  planId: integer('planId').notNull(),
})
