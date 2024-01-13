import * as React from 'react'
import { redirect } from 'next/navigation'
import { getAuthorRecipes, getMenus } from '@/lib/db/api'
import { RecipeList } from '@/components/recipe/RecipeList'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'
import { MENU_QUERY } from '@/lib/constants'

const HomePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const recipes = await getAuthorRecipes({ userId: user.id })
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecipeList initialMenus={initialMenus} recipes={recipes} user={user} />
      </div>
    </>
  )
}

export default HomePage
