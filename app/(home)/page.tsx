import * as React from 'react'
import { getAllRecipes } from '@/lib/db/api'
import { RecipeList } from '@/components/RecipeList'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'

const HomePage = async () => {
  const user = await getCurrentUser()
  const recipes = await getAllRecipes()

  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecipeList recipes={recipes} userId={user?.id} />
      </div>
    </>
  )
}

export default HomePage
