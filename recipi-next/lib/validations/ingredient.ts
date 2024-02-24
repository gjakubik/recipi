import * as z from 'zod'

export type IngredientFormValues = z.infer<typeof ingredientFormSchema>

export const ingredientFormSchema = z.object({
  id: z.string(),
  description: z.string(),
  calories: z.string(),
  protein: z.string(),
  fat: z.string(),
  carbs: z.string(),
  processed: z.boolean().optional(),
})
