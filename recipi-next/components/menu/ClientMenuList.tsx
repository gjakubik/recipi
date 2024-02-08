'use client'

import { Dispatch, SetStateAction, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { GetMenusResult, MenuWithRecipes, Recipe } from '@/types'

import { ClientPagination } from '@/components/ClientPagintation'
import { MenuListItem } from '@/components/menu/MenuListItem'
import { useMenuQuery } from '@/hooks/use-menu-query'

interface ClientMenuListProps {
  initialData: GetMenusResult
  recipe?: Recipe
  selectedMenuIds?: number[]
  setSelectedMenuIds?: Dispatch<SetStateAction<number[] | undefined>>
  params: {
    authorId?: string
    page: number
    limit: number
    sort: 'asc' | 'desc'
    sortBy: 'title' | 'creationDate' | 'updatedAt'
    setPage: (value: number) => void
    setLimit: (value: number) => void
  }
  className?: string
}

export const ClientMenuList = ({
  initialData,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
  params,
  className,
}: ClientMenuListProps) => {
  const { menus, count } = useMenuQuery({
    initialData,
    params,
  })

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {menus?.map((menu, i) => (
        <MenuListItem
          key={i}
          index={i}
          recipe={recipe}
          menu={
            recipe && selectedMenuIds?.includes(menu.id)
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
