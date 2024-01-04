import * as z from 'zod'

export type BulkRecipeFormValues = {
  json: string
}

export const bulkRecipeFormSchema = z.object({
  json: z.string(),
})

export const bulkRecipeJsonSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string().optional(),
    preparationTime: z.string(),
    cookingTime: z.string(),
    servings: z.coerce.string(),
    difficultyLevel: z.string(),
    instructions: z.array(z.string()).optional(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        note: z.string().optional(),
        amount: z.coerce.string(),
        unit: z.string(),
      })
    ),
  })
)

export const bulkMenuJsonSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string().optional(),
    recipes: z.optional(z.array(z.number()).nullable()),
  })
)
