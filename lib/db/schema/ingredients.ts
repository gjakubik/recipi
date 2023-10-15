import {
  mysqlTable,
  int,
  varchar,
  text,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// Ingredients Table
export const ingredients = mysqlTable(
  'ingredients',
  {
    id: int('id').autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    note: text('note'),
    amount: varchar('amount', { length: 255 }).notNull(),
    unit: varchar('unit', { length: 255 }).notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      ingredientsId: primaryKey(table.id),
      ingredientId: unique('ingredientID').on(table.id),
    }
  }
)
