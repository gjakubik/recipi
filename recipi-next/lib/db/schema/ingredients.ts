import {
  mysqlTable,
  timestamp,
  int,
  varchar,
  float,
  index,
  json,
  boolean,
} from 'drizzle-orm/mysql-core'
import { string } from 'zod'
import { IngredientPortion } from '@/types'

// Define a table
export const ingredients = mysqlTable(
  'ingredients',
  {
    id: varchar('id', { length: 36 }).notNull().primaryKey(),
    description: varchar('description', { length: 255 }),
    calories: float('calories'), // per 100g
    protein: float('protein'), // per 100g
    fat: float('fat'), // per 100g
    carbs: float('carbs'), // per 100g
    portions: json('portions')
      .$type<IngredientPortion[]>()
      .default([])
      .notNull(),
    processed: boolean('processed').default(false),
    fdc_id: int('fdc_id').notNull().default(0),
    /*nice_names: [
      {
        nice_name: string,
        count: number,
      },
    ],*/
  },
  (table) => {
    return {
      idIdx: index('id_idx').on(table.id),
      descriptionIdx: index('description_idx').on(table.description), // Much more important - this is how we can index stuff. Make sure to index anything we will be filtering by in our queries
      processedIdx: index('processed_idx').on(table.processed),
    }
  }
)
