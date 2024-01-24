import * as z from 'zod'

export type FeatureFlagFormValues = z.infer<typeof featureFlagFormSchema>

export const featureFlagFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  isActive: z.boolean(),
})
