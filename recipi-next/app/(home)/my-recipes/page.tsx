import * as React from 'react'
import { redirect } from 'next/navigation'
import { getRecipes, getMenus } from '@/lib/db/api'
import { RECIPE_QUERY, MENU_QUERY } from '@/lib/constants'
import { RecipeListPaginated } from '@/components/recipe/RecipeListPaginated'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'

const HomePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const initialRecipes = await getRecipes({
    authorId: user.id,
    ...RECIPE_QUERY,
  })
  const initialMenus = await getMenus({
    authorId: user?.id,
    ...MENU_QUERY,
  })

  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <RecipeListPaginated
        initialData={initialRecipes}
        user={user}
        initialMenus={initialMenus}
        showUserRecipes
      />
    </>
  )
}

export default HomePage
