import { User } from 'next-auth'
import { getRecipes, getMenus } from '@/lib/db/api'
import { RECIPE_QUERY, MENU_QUERY } from '@/lib/constants'

import { ServerPagination } from '@/components/ServerPagination'
import { RecipeList } from './RecipeList'
import { getRecipeQueryString } from '@/lib/utils'
import { Suspense } from 'react'
import { LoadingCards } from './LoadingCards'

interface ServerMenuListProps {
  pagePath: '/my-recipes' | '/'
  user?: User
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerRecipeList = async ({
  pagePath,
  user,
  searchParams,
}: ServerMenuListProps) => {
  //TODO: Add message for if there are no menus, and have a button to create one

  const {
    rcp_page: pageParam,
    rcp_limit: limitParam,
    rcp_sort: sortParam,
    rcp_sortBy: sortByParam,
  } = searchParams

  const page =
    typeof pageParam === 'string' ? parseInt(pageParam) : RECIPE_QUERY.page
  const limit =
    typeof limitParam === 'string' ? parseInt(limitParam) : RECIPE_QUERY.limit
  const sort =
    typeof sortParam === 'string'
      ? (sortParam as 'asc' | 'desc')
      : RECIPE_QUERY.sort
  const sortBy =
    typeof sortByParam === 'string'
      ? (sortByParam as 'title' | 'creationDate' | 'updatedAt')
      : RECIPE_QUERY.sortBy

  const { recipes, count } = await getRecipes({
    authorId: pagePath === '/my-recipes' ? user?.id : undefined,
    page,
    limit,
    sort,
    sortBy,
  })
  const initialMenus = await getMenus({
    authorId: user?.id,
    ...MENU_QUERY,
  })

  return (
    <div className="flex flex-col gap-4">
      <ServerPagination
        mode="recipe"
        basePath={pagePath}
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
        getQueryString={getRecipeQueryString}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={LoadingCards}>
          <RecipeList
            recipes={recipes}
            user={user}
            initialMenus={initialMenus}
          />
        </Suspense>
      </div>
      <ServerPagination
        mode="recipe"
        basePath={pagePath}
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
        getQueryString={getRecipeQueryString}
        withPageInfo
      />
    </div>
  )
}
