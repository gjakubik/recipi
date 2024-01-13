import * as React from 'react'
import { getRecipes, getMenus } from '@/lib/db/api'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'
import { MENU_QUERY, RECIPE_QUERY } from '@/lib/constants'
import { RecipeListPaginated } from '@/components/recipe/RecipeListPaginated'

const HomePage = async () => {
  const user = await getCurrentUser()
  const initialData = await getRecipes({ ...RECIPE_QUERY })
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <RecipeListPaginated
        initialData={initialData}
        user={user}
        initialMenus={initialMenus}
      />
    </>
  )
}

export default HomePage
