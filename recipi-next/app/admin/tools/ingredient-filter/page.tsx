import { getIngredients, getNextIngredient } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'
import { UrlSearch } from '@/components/UrlSearch'
import { IngredientTable } from './IngredientTable'
import { IngredientForm } from '@/components/forms/IngredientForm'

interface IngredietntFilterPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function IngredientFilterPage({
  searchParams,
}: IngredietntFilterPageProps) {
  const { allSearch: searchParam } = searchParams

  const search = typeof searchParam === 'string' ? searchParam : ''

  const ingredients = search
    ? await getIngredients({ search })
    : (await getNextIngredient()) ?? []

  return (
    <>
      <Typography variant="h2">Ingredient Filter</Typography>
      <UrlSearch
        paramName="allSearch"
        placeholder="Search all Ingredients..."
        withButton
      />
      <Typography variant="h4">Add Ingredient</Typography>
      <IngredientForm />
      <IngredientTable ingredients={ingredients} />
    </>
  )
}
