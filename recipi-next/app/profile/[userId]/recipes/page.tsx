import { getUserMenus, getAuthorRecipes } from '@/lib/db/api'

import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

interface ProfileRecipesTabProps {
  params: { userId: string }
}

export default async function ProfileRecipesTab({
  params: { userId },
}: ProfileRecipesTabProps) {
  const recipes = await getAuthorRecipes({ userId })
  const initialMenus = await getUserMenus(userId)

  return (
    <>
      <FullClientRecipeList
        recipes={recipes}
        paramNames={{ page: 'page', limit: 'pageSize', search: 'search' }}
        menus={initialMenus}
      />
    </>
  )
}
