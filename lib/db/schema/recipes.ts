import {
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  primaryKey,
} from 'drizzle-orm/mysql-core'

// Recipes Table
export const recipes = mysqlTable(
  'recipes',
  {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    preparationTime: varchar('preparation_time', { length: 50 }),
    cookingTime: varchar('cooking_time', { length: 50 }),
    servings: int('servings'),
    difficultyLevel: varchar('difficulty_level', { length: 50 }),
    instructions: text('instructions'),
    creationDate: timestamp('creation_date', { mode: 'string' }).defaultNow(),
    authorId: varchar('author_id', { length: 255 }),
  },
  (table) => {
    return {
      recipesId: primaryKey(table.id),
    }
  }
)
