import * as React from 'react'
import { getCurrentUser } from '@/lib/session'
import { getSavedRecipes, getUserMenus } from '@/lib/db/api'

import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

const SavedRecipesPage = async () => {
  const user = await getCurrentUser()

  const recipes = await getSavedRecipes()
  const menus = await getUserMenus(user?.id)
  return (
    <div className="flex flex-col gap-8">
      <FullClientRecipeList
        recipes={recipes}
        paramNames={{ page: 'page', limit: 'pageSize', search: 'search' }}
        menus={menus}
        gridClassName="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        title="Saved Recipes"
      />
    </div>
  )
}

export default SavedRecipesPage
