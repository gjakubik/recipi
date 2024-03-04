import { RecipeIngredient, StoredFile } from '@/types'
import {
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  json,
  index,
  time,
  boolean,
} from 'drizzle-orm/mysql-core'

// Recipes Table
export const recipes = mysqlTable(
  'recipes',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    titleImage: json('title_image').$type<StoredFile | null>().default(null),
    helperImages: json('helper_images')
      .$type<StoredFile[] | null>()
      .default(null),
    description: text('description'),
    preparationTime: time('preparation_time').default('00:00:00'),
    cookingTime: time('cooking_time').default('00:00:00'),
    servings: varchar('servings', { length: 50 }).notNull(),
    difficultyLevel: varchar('difficulty_level', { length: 50 }).notNull(),
    ingredients: json('ingredients')
      .$type<RecipeIngredient[]>()
      .default([])
      .notNull(),
    instructions: json('instructions').$type<string[]>().default([]).notNull(),
    creationDate: timestamp('creation_date', { mode: 'date' })
      .defaultNow()
      .notNull(),
    isPrivate: boolean('private').default(false).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      authorIdx: index('author_idx').on(table.authorId),
      titleIdx: index('title_idx').on(table.title),
      // descriptionIdx: index('description_idx').on(table.description), // need to index this prob, which will mean we should put a max length on it. TODO: see how big a varchar can be
      preparationTimeIdx: index('preparation_time_idx').on(
        table.preparationTime
      ),
      cookingTimeIdx: index('cooking_time_idx').on(table.cookingTime),
      servingsIdx: index('servings_idx').on(table.servings),
      difficultyLevelIdx: index('difficulty_level_idx').on(
        table.difficultyLevel
      ),
      creationDateIdx: index('creation_date_idx').on(table.creationDate),
      updatedAtIdx: index('updated_at_idx').on(table.updatedAt),
      isPrivateIdx: index('is_private_idx').on(table.isPrivate),
    }
  }
)
