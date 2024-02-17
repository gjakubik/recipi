import * as React from 'react'
import { redirect } from 'next/navigation'
import { getRecipes, getMenus } from '@/lib/db/api'
import { RECIPE_QUERY, MENU_QUERY } from '@/lib/constants'
import { RecipeListPaginated } from '@/components/recipe/RecipeListPaginated'
import { Typography } from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/session'
import { Search } from '@/components/Search'
import { ServerRecipeList } from '@/components/recipe/ServerRecipeList'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'

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

  return (
    <>
      <Typography variant="h2" className="mb-4">
        My Recipes
      </Typography>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <ServerRecipeListLoader
        pagePath="/my-recipes"
        user={user}
        searchParams={searchParams}
      />
    </>
  )
}

export default MyRecipesServerPage
