import {
  mysqlTable,
  int,
  varchar,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// Categories Table (Optional for categorizing recipes)
export const categories = mysqlTable(
  'categories',
  {
    id: int('id').autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      categoriesId: primaryKey(table.id),
      categoryId: unique('categoryID').on(table.id),
      categoriesNameUnique: unique('categories_name_unique').on(table.name),
    }
  }
)
