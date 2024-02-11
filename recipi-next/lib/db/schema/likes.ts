import {
  mysqlTable,
  timestamp,
  int,
  index,
  varchar,
  unique,
} from 'drizzle-orm/mysql-core'

// Likes Table (for tracking recipe likes or favorites)
export const likes = mysqlTable(
  'likes',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      likeId: unique('likeID').on(table.id),
    }
  }
)
