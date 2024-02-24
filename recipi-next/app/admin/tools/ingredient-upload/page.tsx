import { Typography } from '@/components/ui/typography'
import { UrlSearch } from '@/components/UrlSearch'
import { IngredientForm } from '@/components/forms/IngredientForm'

export default async function IngredientUpload() {
  return (
    <>
      <Typography variant="h2">Ingredient Upload</Typography>
      <IngredientForm />
    </>
  )
}
