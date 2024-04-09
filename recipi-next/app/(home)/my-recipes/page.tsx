import * as React from 'react'
import { redirect } from 'next/navigation'
import { Typography } from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/session'
import { getAuthorRecipes, getUserMenus } from '@/lib/db/api'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

const MyRecipesServerPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const recipes = await getAuthorRecipes({ userId: user.id })
  const menus = await getUserMenus(user.id)

  return (
    <>
      <Typography variant="h2" className="mb-4">
        My Recipes
      </Typography>
      <FullClientRecipeList
        recipes={recipes}
        menus={menus}
        title="My Recipes"
        paramNames={{ search: 'search' }}
        gridClassName="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      />
    </>
  )
}

export default MyRecipesServerPage
