import {
  mysqlTable,
  timestamp,
  text,
  int,
  varchar,
  index,
  unique,
} from 'drizzle-orm/mysql-core'

// Comments Table
export const comments = mysqlTable(
  'comments',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }),
    recipeId: varchar('recipe_id', { length: 255 }),
    text: text('text'),
    postedAt: timestamp('posted_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      commentId: unique('commentID').on(table.id),
    }
  }
)
