import {
  mysqlTable,
  timestamp,
  int,
  varchar,
  index,
} from 'drizzle-orm/mysql-core'

// Define a table
export const ingredients = mysqlTable(
  'ingredients',
  {
    id: int('id').autoincrement().primaryKey().notNull(), // Autoincremented IDs are prob bad - we can look to migrate off of them
    name: varchar('name', { length: 255 }),
    calories: int('calories'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(), // This col in other tables is a string, I want to move them to this format
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name), // Much more important - this is how we can index stuff. Make sure to index anything we will be filtering by in our queries
    }
  }
)
