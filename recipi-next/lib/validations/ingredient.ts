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
  portions: z.array(
    z.object({
      unit: z.string(),
      abbreviation: z.string(),
      value: z.number(),
      gram_weight: z.number(),
      gram_per_unit: z.number(),
    })
  ),
  processed: z.boolean().optional(),
})
