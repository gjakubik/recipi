import { Dispatch, SetStateAction, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { MenuWithRecipes, Recipe } from '@/types'

import { ClientPagination } from '@/components/ClientPagintation'
import { MenuListItem } from '@/components/menu/MenuListItem'

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
    setLimit: (value: number) => void
  }
  className?: string
}

export const ClientMenuList = ({
  menus,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
  count,
  params,
  className,
}: ClientMenuListProps) => {
  const { page, limit } = params
  //TODO: Add message for if there are no menus, and have a button to create one
  const shownMenus = useMemo(
    () => menus?.slice(page * limit, page * limit + limit) || menus,
    [page, limit, menus]
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
      <ClientPagination {...params} count={count} />
    </div>
  )
}
