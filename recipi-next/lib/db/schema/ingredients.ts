import {
  mysqlTable,
  timestamp,
  int,
  varchar,
  index,
  primaryKey,
  float,
} from 'drizzle-orm/mysql-core'

// Define a table
export const ingredients = mysqlTable(
  'ingredients',
  {
    id: int('id').autoincrement().notNull(), // Autoincremented IDs are prob bad - we can look to migrate off of them
    name: varchar('name', { length: 255 }),
    calories: float('calories'),
    createdAt: timestamp('created_at').defaultNow(), // This col in other tables is a string, I want to move them to this format
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      ingredientsId: primaryKey(table.id), // Define a PK - we dont constrain our DB bc reasons id have to research again but I know I did it for a reason. So overall not super important but this is how you would do it
      nameIdx: index('name_idx').on(table.name), // Much more important - this is how we can index stuff. Make sure to index anything we will be filtering by in our queries
    }
  }
)
