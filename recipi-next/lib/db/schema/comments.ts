import {
  mysqlTable,
  timestamp,
  text,
  int,
  varchar,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// Comments Table
export const comments = mysqlTable(
  'comments',
  {
    id: int('id').autoincrement().notNull(),
    userId: varchar('user_id', { length: 255 }),
    recipeId: varchar('recipe_id', { length: 255 }),
    text: text('text'),
    commentDate: timestamp('comment_date', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      commentsId: primaryKey(table.id),
      commentId: unique('commentID').on(table.id),
    }
  }
)
