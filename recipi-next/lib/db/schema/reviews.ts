import {
  mysqlTable,
  timestamp,
  text,
  int,
  varchar,
  index,
} from 'drizzle-orm/mysql-core'

// Comments Table
export const reviews = mysqlTable(
  'reviews',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    rating: int('rating').notNull().default(0),
    text: text('text'),
    postedAt: timestamp('posted_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      updatedAtIdx: index('updated_at_idx').on(table.updatedAt),
    }
  }
)
