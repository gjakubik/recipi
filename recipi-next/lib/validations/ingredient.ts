import * as z from 'zod'

export type IngredientFormValues = z.infer<typeof ingredientFormSchema>

export const ingredientFormSchema = z.object({
  fdc_id: z.string(),
  description: z.string(),
  calories: z.string(),
  protein: z.string(),
  fat: z.string(),
  carbs: z.string(),
  portions: z.array(
    z.object({
      unit: z.string(),
      abbreviation: z.string(),
      value: z.string(),
      gram_weight: z.string(),
      gram_per_unit: z.string(),
    })
  ),
  processed: z.boolean().optional(),
})

export type PortionFormValues = z.infer<typeof portionFormSchema>
export const portionFormSchema = z.object({
  unit: z.string(),
  abbreviation: z.string(),
  value: z.string(),
  gram_weight: z.string(),
  gram_per_unit: z.string(),
})
