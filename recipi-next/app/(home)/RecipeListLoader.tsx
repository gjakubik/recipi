import { getCurrentUser } from '@/lib/session'
import { getRecipes, getMenus } from '@/lib/db/api'
import { MENU_QUERY, RECIPE_QUERY } from '@/lib/constants'
import { RecipeListPaginated } from '@/components/recipe/RecipeListPaginated'

export const RecipeListLoader = async () => {
  const user = await getCurrentUser()
  const initialData = await getRecipes({ ...RECIPE_QUERY })
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  return (
    <RecipeListPaginated
      initialData={initialData}
      initialMenus={initialMenus}
    />
  )
}
