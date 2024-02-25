import { User } from 'next-auth'
import { getMenus } from '@/lib/db/api'
import { MENU_QUERY } from '@/lib/constants'

import { ServerPagination } from '@/components/ServerPagination'
import { MenuListItem } from '@/components/menu/MenuListItem'
import { getMenuQueryString } from '@/lib/utils'

interface ServerMenuListProps {
  title?: string
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerMenuList = async ({
  title,
  pagePath,
  user,
  profileUserId,
  searchParams,
}: ServerMenuListProps) => {
  //TODO: Add message for if there are no menus, and have a button to create one

  const {
    mnu_page: pageParam,
    mnu_limit: limitParam,
    mnu_sort: sortParam,
    mnu_sortBy: sortByParam,
  } = searchParams

  const page =
    typeof pageParam === 'string' ? parseInt(pageParam) : MENU_QUERY.page
  const limit =
    typeof limitParam === 'string' ? parseInt(limitParam) : MENU_QUERY.limit
  const sort =
    typeof sortParam === 'string'
      ? (sortParam as 'asc' | 'desc')
      : MENU_QUERY.sort
  const sortBy =
    typeof sortByParam === 'string'
      ? (sortByParam as 'title' | 'creationDate' | 'updatedAt')
      : MENU_QUERY.sortBy

  const authorId =
    pagePath === '/my-menus'
      ? user?.id
      : pagePath.includes('/profile')
        ? profileUserId
        : undefined

  const { menus, count } = await getMenus({
    authorId,
    page,
    limit,
    sort,
    sortBy,
  })

  return (
    <div className="flex flex-col gap-2">
      <ServerPagination
        title={title}
        mode="menu"
        basePath={pagePath}
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
        getQueryString={getMenuQueryString}
      />
      {menus?.map((menu, i) => <MenuListItem key={i} index={i} menu={menu} />)}
      <ServerPagination
        mode="menu"
        basePath={pagePath}
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
        getQueryString={getMenuQueryString}
        withPageInfo
      />
    </div>
  )
}
