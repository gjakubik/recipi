import { StoredFile } from '@/lib/types'
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
} from 'drizzle-orm/mysql-core'

// Recipes Table
export const recipes = mysqlTable(
  'recipes',
  {
    id: int('id').autoincrement().notNull(),
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
    instructions: json('instructions').$type<string[] | null>().default(null),
    creationDate: timestamp('creation_date', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    authorId: varchar('author_id', { length: 255 }),
  },
  (table) => {
    return {
      recipesId: primaryKey(table.id),
      authorIdx: index('author_idx').on(table.authorId),
    }
  }
)
