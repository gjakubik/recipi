import * as React from 'react'
import { redirect } from 'next/navigation'
import { Typography } from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/session'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'
import { getAuthorRecipes, getMenus } from '@/lib/db/api'
import { MENU_QUERY } from '@/lib/constants'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

interface MyRecipesServerPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const MyRecipesServerPage = async ({
  searchParams,
}: MyRecipesServerPageProps) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const recipes = await getAuthorRecipes({ userId: user.id })
  const initialMenus = await getMenus({ authorId: user?.id, ...MENU_QUERY })

  return (
    <>
      <Typography variant="h2" className="mb-4">
        My Recipes
      </Typography>
      <FullClientRecipeList
        recipes={recipes}
        initialMenus={initialMenus}
        title="My Recipes"
        paramNames={{ search: 'search' }}
        gridClassName="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      />
    </>
  )
}

export default MyRecipesServerPage
