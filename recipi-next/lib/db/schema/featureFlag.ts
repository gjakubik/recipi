import { mysqlTable, int, varchar, boolean } from 'drizzle-orm/mysql-core'

export const featureFlags = mysqlTable('featureFlag', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  isActive: boolean('isActive').default(false).notNull(),
})
