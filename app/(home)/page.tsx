import * as React from 'react'
import { getAllRecipes, getMenus } from '@/lib/db/api'
import { RecipeList } from '@/components/recipe/RecipeList'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'
import { Menu } from '@/types'

const HomePage = async () => {
  const user = await getCurrentUser()
  const recipes = await getAllRecipes()
  const { menus } = await getMenus({ authorId: user?.id, limit: 0 })

  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecipeList recipes={recipes} userId={user?.id} menus={menus} />
      </div>
    </>
  )
}

export default HomePage
