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
  interval,
} from 'drizzle-orm/pg-core'

import { sql } from 'drizzle-orm'

export const account = pgTable(
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
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
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

export const featureFlag = pgTable('featureFlag', {
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
    portions: json('portions').notNull(),
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
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
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
    recipes: json('recipes'),
    creationDate: timestamp('creation_date', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
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
    preparationTime: interval('preparation_time').default('00:00:00'),
    cookingTime: interval('cooking_time').default('00:00:00'),
    servings: varchar('servings', { length: 50 }).notNull(),
    difficultyLevel: varchar('difficulty_level', { length: 50 }).notNull(),
    instructions: json('instructions').notNull(),
    creationDate: timestamp('creation_date', { mode: 'string' })
      .defaultNow()
      .notNull(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
    titleImage: json('title_image'),
    helperImages: json('helper_images'),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    ingredients: json('ingredients').notNull(),
    private: boolean('private').default(false).notNull(),
    rating: integer('rating').default(0).notNull(),
  },
  (table) => {
    return {
      authorIdIdx: index('recipes_author_id_idx').on(table.authorId),
      privateIdx: index('recipes_private_idx').on(table.private),
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
    postedAt: timestamp('posted_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
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
    savedAt: timestamp('saved_at', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index('saved_recipes_recipe_id_idx').on(table.recipeId),
      userIdIdx: index('saved_recipes_user_id_idx').on(table.userId),
      savedAtIdx: index('saved_recipes_saved_at_idx').on(table.savedAt),
    }
  }
)

export const session = pgTable(
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

export const user = pgTable(
  'user',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'string' }),
    image: varchar('image', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    role: varchar('role', { length: 255 }).default('basic'),
  },
  (table) => {
    return {
      userEmailKey: unique('user_email_key').on(table.email),
    }
  }
)

export const verificationToken = pgTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).primaryKey().notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      verificationTokenTokenKey: unique('verificationToken_token_key').on(
        table.token
      ),
    }
  }
)
