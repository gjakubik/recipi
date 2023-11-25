import {
  mysqlTable,
  varchar,
  int,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/mysql-core'

// RecipeCategories Table (Many-to-Many Relationship Table)
export const recipeTags = mysqlTable(
  'recipe_tags',
  {
    id: int('id').autoincrement().notNull(),
    recipeId: varchar('recipe_id', { length: 255 }).notNull(),
    tagId: varchar('tag_id', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      recipeTagsId: primaryKey(table.id),
      recipeTagId: unique('recipeTagID').on(table.id),
    }
  }
)
