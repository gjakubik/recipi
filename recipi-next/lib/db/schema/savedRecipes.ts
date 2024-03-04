import {
  mysqlTable,
  timestamp,
  varchar,
  int,
  index,
} from 'drizzle-orm/mysql-core'

export const savedRecipes = mysqlTable(
  'saved_recipes',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    recipeId: int('recipe_id').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    savedAt: timestamp('saved_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      recipeIdx: index('recipe_idx').on(table.recipeId),
      userIdx: index('user_idx').on(table.userId),
      savedAtIdx: index('saved_at_idx').on(table.savedAt),
    }
  }
)
