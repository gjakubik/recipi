import { getCurrentUser } from '@/lib/session'
import { getRecipes, getMenus, getExploreRecipes } from '@/lib/db/api'
import { MENU_QUERY, RECIPE_QUERY } from '@/lib/constants'
import { RecipeListPaginated } from '@/components/recipe/RecipeListPaginated'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

export const RecipeListLoader = async () => {
  const user = await getCurrentUser()
  const initialData = await getExploreRecipes({})
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  return (
    <FullClientRecipeList
      recipes={initialData.recipes}
      paramNames={{ page: 'rcp_page', limit: 'rcp_pageSize' }}
      initialMenus={initialMenus}
    />
  )
}
