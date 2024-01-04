import { Dispatch, SetStateAction, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Menu, MenuWithRecipes, Recipe } from '@/types'

import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { ClientPagination } from '../ClientPagintation'
import { MenuListItem } from './MenuListItem'

interface ClientMenuListProps {
  menus?: MenuWithRecipes[]
  recipe: Recipe
  selectedMenuIds?: number[]
  setSelectedMenuIds?: Dispatch<SetStateAction<number[] | undefined>>
  count: number
  params: {
    page: number
    limit: number
    sort: 'asc' | 'desc' | undefined
    sortBy: 'title' | 'creationDate' | 'updatedAt' | undefined
    setPage: (value: number) => void
  }
  className?: string
}

export const ClientMenuList = ({
  menus,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
  count,
  params: { page, limit, sort, sortBy, setPage },
  className,
}: ClientMenuListProps) => {
  //TODO: Add message for if there are no menus, and have a button to create one
  const shownMenus = useMemo(
    () => menus?.slice(page * limit, page * limit + limit) || menus,
    [page, limit]
  )

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {shownMenus?.map((menu, i) => (
        <MenuListItem
          key={i}
          index={i}
          recipe={recipe}
          menu={
            selectedMenuIds?.includes(menu.id)
              ? {
                  ...menu,
                  recipeInfo: menu.recipeInfo
                    ? [recipe, ...menu.recipeInfo]
                    : [recipe],
                }
              : menu
          }
          selectedMenuIds={selectedMenuIds}
          setSelectedMenuIds={setSelectedMenuIds}
        />
      ))}
      <ClientPagination
        page={page}
        limit={limit}
        sort={sort}
        sortBy={sortBy}
        setPage={setPage}
        count={count}
      />
    </div>
  )
}
