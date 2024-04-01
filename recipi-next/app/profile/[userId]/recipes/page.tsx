import { getCurrentUser } from '@/lib/session'
import { getMenus, getAuthorRecipes } from '@/lib/db/api'
import { MENU_QUERY } from '@/lib/constants'

import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

interface ProfileRecipesTabProps {
  params: { userId: string }
}

export default async function ProfileRecipesTab({
  params: { userId },
}: ProfileRecipesTabProps) {
  const recipes = await getAuthorRecipes({ userId })
  const initialMenus = await getMenus({ authorId: userId, ...MENU_QUERY })

  return (
    <>
      <FullClientRecipeList
        recipes={recipes}
        paramNames={{ page: 'page', limit: 'pageSize', search: 'search' }}
        initialMenus={initialMenus}
      />
    </>
  )
}
