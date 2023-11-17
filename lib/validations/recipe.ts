import * as z from 'zod'

export type RecipeFormValues = z.infer<typeof recipeFormSchema>

export const savedImageSchema = z.object({
  key: z.string(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  caption: z.string().optional(),
})

export const recipeFormSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  titleImage: savedImageSchema.optional(),
  helperImages: z.array(savedImageSchema).optional(),
  description: z.string().optional(),
  preparationTime: z.string(),
  cookingTime: z.string(),
  servings: z.string(),
  difficultyLevel: z.string(),
  instructions: z
    .array(z.object({ id: z.number(), instruction: z.string() }))
    .optional(),
  ingredients: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      note: z.string().optional(),
      amount: z.string(),
      unit: z.string(),
    })
  ),
})
