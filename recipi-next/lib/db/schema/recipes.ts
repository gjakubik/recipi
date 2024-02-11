import { Ingredient, StoredFile } from '@/types'
import {
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  primaryKey,
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
      .$type<Ingredient[]>()
      .default([])
      .notNull(),
    instructions: json('instructions').$type<string[]>().default([]).notNull(),
    creationDate: timestamp('creation_date', { mode: 'string' }).defaultNow(),
    isPrivate: boolean('private').default(false).notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      authorIdx: index('author_idx').on(table.authorId),
      isPrivateIdx: index('is_private_idx').on(table.isPrivate),
    }
  }
)
