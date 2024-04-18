import { getCurrentUser } from '@/lib/session'
import { getUserMenus, getExploreRecipes } from '@/lib/db/api'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

export const RecipeListLoader = async () => {
  const user = await getCurrentUser()
  const { recipes } = await getExploreRecipes({ search: '' })
  const menus = await getUserMenus(user?.id)

  return (
    <FullClientRecipeList
      recipes={recipes}
      paramNames={{ page: 'page', limit: 'pageSize', search: 'search' }}
      menus={menus}
      gridClassName="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    />
  )
}
