import { mysqlTable, int, varchar, index, unique } from 'drizzle-orm/mysql-core'

// Categories Table (Optional for categorizing recipes)
export const tags = mysqlTable(
  'tags',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      categoriesNameUnique: unique('categories_name_unique').on(table.name),
    }
  }
)
