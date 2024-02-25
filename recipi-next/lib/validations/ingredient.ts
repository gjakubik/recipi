import * as z from 'zod'

export type IngredientFormValues = z.infer<typeof ingredientFormSchema>

export const ingredientFormSchema = z.object({
  id: z.string(),
  fdc_id: z.number(),
  description: z.string(),
  calories: z.string(),
  protein: z.string(),
  fat: z.string(),
  carbs: z.string(),
  portions: z.object({
    unit: z.string(),
    abbreviation: z.string(),
    value: z.string(),
    gram_weight: z.string(),
    gram_per_unit: z.string(),
  }),
  processed: z.boolean().optional(),
})
