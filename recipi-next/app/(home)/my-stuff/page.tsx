import * as React from 'react'
import { redirect } from 'next/navigation'
import { getAuthorRecipes, getUserMenus } from '@/lib/db/api'
import { RecipeList } from '@/components/recipe/RecipeList'
import { getCurrentUser } from '@/lib/session'

const HomePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const recipes = await getAuthorRecipes({ userId: user.id })
  const menus = await getUserMenus(user.id)

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <RecipeList menus={menus} recipes={recipes} />
      </div>
    </>
  )
}

export default HomePage
