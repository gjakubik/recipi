import { mysqlTable, varchar, int, index, unique } from 'drizzle-orm/mysql-core'

// RecipeCategories Table (Many-to-Many Relationship Table)
export const recipeTags = mysqlTable(
  'recipe_tags',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    tagId: varchar('tag_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index('recipe_id_idx').on(table.recipeId),
      tagIdIdx: index('tag_id_idx').on(table.tagId),
      recipeTagId: unique('recipeTagID').on(table.id),
    }
  }
)
