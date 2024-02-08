import {
  mysqlTable,
  timestamp,
  varchar,
  text,
  int,
  primaryKey,
  json,
  index,
} from 'drizzle-orm/mysql-core'

export const menus = mysqlTable(
  'menus',
  {
    id: int('id').autoincrement().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    recipes: json('recipes').$type<number[] | undefined>(), // json list of recipe ids
    creationDate: timestamp('creation_date', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    authorId: varchar('author_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      menusId: primaryKey(table.id),
      authorIdx: index('author_idx').on(table.authorId),
    }
  }
)
