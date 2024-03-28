import { User } from 'next-auth'
import { cn } from '@/lib/utils'
import { getRecipes, getMenus } from '@/lib/db/api'
import { RECIPE_QUERY, MENU_QUERY } from '@/lib/constants'

import { RecipeList } from './RecipeList'
import { Suspense } from 'react'
import { SkinnyLoadingCards, WideLoadingCards } from './LoadingCards'
import { UrlPagination } from '../UrlPagination'

interface ServerRecipeListProps {
  title?: string
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
  gridClassName?: string
}

export const ServerRecipeList = async ({
  title,
  pagePath,
  user,
  profileUserId,
  searchParams,
  gridClassName,
}: ServerRecipeListProps) => {
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

  const authorId =
    pagePath === '/my-recipes'
      ? user?.id
      : pagePath.includes('/profile')
        ? profileUserId
        : undefined

  const { recipes, count } = await getRecipes({
    authorId,
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
      <UrlPagination
        mode="server"
        count={count}
        paramNames={{ page: 'rcp_page', limit: 'rcp_limit' }}
        defaultLimit={6}
      />
      <div
        className={cn(
          'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3',
          gridClassName
        )}
      >
        <Suspense
          fallback={gridClassName ? SkinnyLoadingCards : WideLoadingCards}
        >
          <RecipeList recipes={recipes} initialMenus={initialMenus} />
        </Suspense>
      </div>
      <UrlPagination
        mode="server"
        count={count}
        paramNames={{ page: 'rcp_page', limit: 'rcp_limit' }}
        defaultLimit={6}
        withPageInfo
      />
    </div>
  )
}
