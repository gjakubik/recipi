import {
  mysqlTable,
  timestamp,
  int,
  varchar,
  float,
  index,
  boolean,
} from 'drizzle-orm/mysql-core'

// Define a table
export const ingredients = mysqlTable(
  'ingredients',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    description: varchar('description', { length: 255 }),
    calories: float('calories'),
    protein: float('protein'),
    fat: float('fat'),
    carbs: float('carbs'),
    processed: boolean('processed').default(false),
  },
  (table) => {
    return {
      descriptionIdx: index('description_idx').on(table.description), // Much more important - this is how we can index stuff. Make sure to index anything we will be filtering by in our queries
      processedIdx: index('processed_idx').on(table.processed),
    }
  }
)
