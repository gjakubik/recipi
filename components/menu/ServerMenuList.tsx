import { User } from 'next-auth'
import { getMenus } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'

import { Separator } from '@/components/ui/separator'
import { ServerPagination } from '../ServerPagination'
import { Menu, MenuWithRecipes } from '@/types'
import { ClientPagination } from '../ClientPagintation'
import { MenuListItem } from './MenuListItem'

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
      {menus?.map((menu, i) => (
        <MenuListItem key={i} index={i} menu={menu} />
      ))}
      <ServerPagination
        basePath="/my-menus"
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        count={count}
      />
    </div>
  )
}
