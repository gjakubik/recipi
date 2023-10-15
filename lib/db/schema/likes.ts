import {
  mysqlTable,
  timestamp,
  int,
  index,
  varchar,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// Likes Table (for tracking recipe likes or favorites)
export const likes = mysqlTable(
  'likes',
  {
    id: int('id').autoincrement().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    likeDate: timestamp('like_date', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      likesId: primaryKey(table.id),
      likeId: unique('likeID').on(table.id),
    }
  }
)
