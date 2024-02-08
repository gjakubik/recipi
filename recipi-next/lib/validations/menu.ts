import * as z from 'zod'

export type MenuFormValues = z.infer<typeof menuFormSchema>

export const menuFormSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  recipes: z.optional(z.array(z.number()).nullable()),
  authorId: z.string(),
})
