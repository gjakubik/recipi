'use client'

import { Dispatch, SetStateAction, useMemo } from 'react'
import { motion } from 'framer-motion'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { cn } from '@/lib/utils'
import { menuSearchFilter } from '@/utils/filtering'
import { MenuQueryParams, MenuWithRecipes, Recipe } from '@/types'
import { DEFAULT_PARAM_NAMES, MENU_QUERY } from '@/lib/constants'

import {
  CheckedMenuListItem,
  MenuListItem,
} from '@/components/menu/MenuListItem'
import { UrlPagination } from '@/components/UrlPagination'
import { UrlSearch } from '@/components/UrlSearch'

interface FullClientMenuListProps {
  menus: MenuWithRecipes[]
  authorId?: string
  paramNames?: MenuQueryParams
  recipe?: Recipe
  selectedMenuIds?: number[]
  setSelectedMenuIds?: Dispatch<SetStateAction<number[] | undefined>>
  className?: string
}

export const FullClientMenuList = ({
  menus,
  paramNames,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
  className,
}: FullClientMenuListProps) => {
  const [page] = useQueryState(
    paramNames?.page || DEFAULT_PARAM_NAMES.page,
    parseAsInteger.withDefault(0)
  )
  const [pageSize] = useQueryState(
    paramNames?.limit || DEFAULT_PARAM_NAMES.limit,
    parseAsInteger.withDefault(MENU_QUERY.limit)
  )

  const [search] = useQueryState(
    paramNames?.search || DEFAULT_PARAM_NAMES.search,
    parseAsString.withDefault('')
  )

  const searchFilteredMenus = useMemo(
    () => menus.filter(menuSearchFilter(search)),
    [menus, search]
  )

  const shownMenus = useMemo(
    () => searchFilteredMenus.slice(page * pageSize, (page + 1) * pageSize),
    [searchFilteredMenus, page, pageSize]
  )

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <UrlSearch
        placeholder="Type to search menus..."
        paramName={paramNames?.search}
      />
      <div className="flex flex-col gap-2">
        {shownMenus?.map((menu, i) => (
          <motion.div
            key={menu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.08 * i }}
          >
            {!setSelectedMenuIds ? (
              <MenuListItem key={menu.id} index={i} menu={menu} />
            ) : (
              <CheckedMenuListItem
                key={menu.id}
                index={i}
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
                recipe={recipe}
                selectedMenuIds={selectedMenuIds}
                setSelectedMenuIds={setSelectedMenuIds}
                initiallyChecked={selectedMenuIds?.includes(menu.id) || false}
              />
            )}
          </motion.div>
        ))}
        <UrlPagination
          mode="client"
          paramNames={paramNames}
          count={menus.length}
          defaultLimit={MENU_QUERY.limit}
          withPageInfo
        />
      </div>
    </div>
  )
}
