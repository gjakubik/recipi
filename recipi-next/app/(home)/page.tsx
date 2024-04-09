import * as React from 'react'
import { getCurrentUser } from '@/lib/session'
import { getExploreRecipes, getMenus, getUserMenus } from '@/lib/db/api'
import { MENU_QUERY } from '@/lib/constants'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'
import { ServerMenuListLoader } from '@/components/menu/ServerMenuListLoader'
import { FullClientRecipeList } from '@/components/recipe/FullClientRecipeList'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const user = await getCurrentUser()

  const search =
    typeof searchParams.rcp_q === 'string' ? searchParams.rcp_q : ''

  const { recipes } = await getExploreRecipes({ search })
  const menus = await getUserMenus(user?.id)
  console.log(recipes)
  return (
    <div className="flex flex-col gap-8">
      <FullClientRecipeList
        recipes={recipes}
        paramNames={{ page: 'page', limit: 'pageSize', search: 'search' }}
        menus={menus}
        gridClassName="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      />
      {/* Take out menu list for now */}
      {/* <ServerMenuListLoader
        title="New Menus"
        pagePath="/"
        user={user}
        searchParams={searchParams}
      /> */}
    </div>
  )
}

export default HomePage
