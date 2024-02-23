import { getIngredients } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'
import { UrlSearch } from '@/components/UrlSearch'
import { IngredientTable } from './IngredientTable'

interface IngredietntFilterPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function IngredientFilterPage({
  searchParams,
}: IngredietntFilterPageProps) {
  const { search: searchParam } = searchParams

  const search = typeof searchParam === 'string' ? searchParam : ''

  const ingredients = await getIngredients({ search })

  console.log(ingredients)

  return (
    <>
      <Typography variant="h2">Ingredient Filter</Typography>
      <UrlSearch initialSearch={search} />
      <IngredientTable ingredients={ingredients} />
    </>
  )
}
