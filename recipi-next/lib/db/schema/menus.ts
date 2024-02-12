import {
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  json,
  index,
} from 'drizzle-orm/mysql-core'

export const menus = mysqlTable(
  'menus',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    recipes: json('recipes').$type<number[] | undefined>(), // json list of recipe ids
    creationDate: timestamp('creation_date', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .onUpdateNow(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      authorIdx: index('author_idx').on(table.authorId),
    }
  }
)
