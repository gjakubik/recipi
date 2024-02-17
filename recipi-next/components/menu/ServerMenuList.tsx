import { ServerPagination } from '@/components/ServerPagination'
import { MenuWithRecipes } from '@/types'
import { MenuListItem } from '@/components/menu/MenuListItem'
import { getMenuQueryString } from '@/lib/utils'

interface ServerMenuListProps {
  menus?: MenuWithRecipes[]
  count: number
  params: {
    page: number
    limit: number
    sort: 'asc' | 'desc' | undefined
    sortBy: 'title' | 'creationDate' | 'updatedAt' | undefined
  }
}

export const ServerMenuList = async ({
  menus,
  count,
  params: { page, limit, sort, sortBy },
}: ServerMenuListProps) => {
  //TODO: Add message for if there are no menus, and have a button to create one

  return (
    <div className="flex flex-col gap-2">
      <ServerPagination
        mode="menu"
        basePath="/my-menus"
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
        getQueryString={getMenuQueryString}
      />
      {menus?.map((menu, i) => (
        <MenuListItem key={i} index={i} menu={menu} />
      ))}
      <ServerPagination
        mode="menu"
        basePath="/my-menus"
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
