import {
  mysqlTable,
  varchar,
  int,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// RecipeCategories Table (Many-to-Many Relationship Table)
export const recipeCategories = mysqlTable(
  'recipe_categories',
  {
    id: int('id').autoincrement().notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    categoryId: varchar('category_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      recipeCategoriesId: primaryKey(table.id),
      recipeCategoryId: unique('recipeCategoryID').on(table.id),
    }
  }
)
