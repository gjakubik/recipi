'use client'

import { Dispatch, SetStateAction, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { GetMenusResult, MenuWithRecipes, Recipe } from '@/types'

import { ClientPagination } from '@/components/ClientPagintation'
import {
  CheckedMenuListItem,
  MenuListItem,
} from '@/components/menu/MenuListItem'
import { useMenuQuery } from '@/hooks/use-menu-query'

interface ClientMenuListProps {
  initialData: GetMenusResult
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
        <MenuListItem key={i} index={i} menu={menu} />
      ))}
      <ClientPagination {...params} count={count} />
    </div>
  )
}

interface SelectingClientMenuListProps {
  initialData: GetMenusResult
  recipe: Recipe
  selectedMenuIds?: number[]
  setSelectedMenuIds: Dispatch<SetStateAction<number[] | undefined>>
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

export const SelectingClientMenuList = ({
  initialData,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
  params,
  className,
}: SelectingClientMenuListProps) => {
  const { menus, count } = useMenuQuery({
    initialData,
    params,
  })

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {menus?.map((menu, i) => (
        <CheckedMenuListItem
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
          initiallyChecked={selectedMenuIds?.includes(menu.id) || false}
        />
      ))}
      <ClientPagination {...params} count={count} />
    </div>
  )
}
