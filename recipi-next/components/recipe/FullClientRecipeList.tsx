'use client'

import { PropsWithChildren, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsArrayOf,
} from 'nuqs'
import {
  GetMenusResult,
  MenuWithRecipes,
  Recipe,
  RecipeQueryParams,
} from '@/types'
import {
  DEFAULT_PARAM_NAMES,
  RECIPE_QUERY,
  RECIPE_ORDER_BY_OPTIONS_LIST,
} from '@/lib/constants'
import {
  recipeSortByUpdatedAt,
  recipeSortByCreationDate,
  recipeSortByPrepTime,
  recipeSortByCookTime,
  recipeSortByDifficultyLevel,
  recipeSortByServings,
} from '@/utils/sorting'
import {
  recipeFilterUnderMaxPrepTime,
  recipeFilterUnderMaxCookTime,
  recipeFilterDifficultyLevel,
  recipeSearchFilter,
  recipeFilterServings,
} from '@/utils/filtering'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { UrlPagination } from '@/components/UrlPagination'
import { RecipeCard } from '@/components/recipe/RecipeCard'
import { RecipeFilters } from '@/components/recipe/RecipeFilters'
import { UrlSearch } from '@/components/UrlSearch'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react'

interface FullClientRecipeListProps extends PropsWithChildren {
  recipes: Recipe[]
  paramNames?: RecipeQueryParams
  menus: MenuWithRecipes[]
  gridClassName?: string
  title?: string
}

const sortOptions = ['asc', 'desc'] as const

export const FullClientRecipeList = ({
  recipes,
  paramNames,
  menus,
  gridClassName,
  title = 'Recipes',
}: FullClientRecipeListProps) => {
  const [forceUpdate, setForceUpdate] = useState(0)
  const [search, setSearch] = useQueryState(
    paramNames?.search || DEFAULT_PARAM_NAMES.search,
    parseAsString.withDefault('')
  )
  const [page, setPage] = useQueryState(
    paramNames?.page || DEFAULT_PARAM_NAMES.page,
    parseAsInteger.withDefault(0)
  )
  const [pageSize] = useQueryState(
    paramNames?.limit || DEFAULT_PARAM_NAMES.limit,
    parseAsInteger.withDefault(RECIPE_QUERY.limit)
  )
  const [maxPrepTime] = useQueryState(
    paramNames?.maxPrepTime || DEFAULT_PARAM_NAMES.maxPrepTime,
    parseAsString.withDefault('INF')
  )
  const [maxCookTime] = useQueryState(
    paramNames?.maxCookTime || DEFAULT_PARAM_NAMES.maxCookTime,
    parseAsString.withDefault('INF')
  )

  const [minServings] = useQueryState(
    paramNames?.minServings || DEFAULT_PARAM_NAMES.minServings,
    parseAsInteger.withDefault(0)
  )

  const [maxServings] = useQueryState(
    paramNames?.maxServings || DEFAULT_PARAM_NAMES.maxServings,
    parseAsInteger.withDefault(25)
  )

  const [difficultyLevel] = useQueryState(
    paramNames?.difficultyLevel || DEFAULT_PARAM_NAMES.difficultyLevel,
    parseAsArrayOf(parseAsString).withDefault([])
  )

  const numFiltersApplied = useMemo(() => {
    return (
      (maxPrepTime !== 'INF' ? 1 : 0) +
      (maxCookTime !== 'INF' ? 1 : 0) +
      (minServings ? 1 : 0) +
      (maxServings !== 25 ? 1 : 0) +
      (difficultyLevel.length > 0 ? 1 : 0)
    )
  }, [maxPrepTime, maxCookTime, minServings, maxServings, difficultyLevel])

  const [order, setOrder] = useQueryState(
    paramNames?.order || DEFAULT_PARAM_NAMES.order,
    parseAsStringLiteral(sortOptions).withDefault(RECIPE_QUERY.sort)
  )

  const [orderBy, setOrderBy] = useQueryState(
    paramNames?.orderBy || DEFAULT_PARAM_NAMES.orderBy,
    parseAsString.withDefault(RECIPE_QUERY.sortBy)
  )

  const searchFilteredRecipes = useMemo(
    () => recipes.filter(recipeSearchFilter(search)),
    [recipes, search]
  )

  const [sortFunction, orderLabel] = useMemo(() => {
    switch (orderBy) {
      case 'updatedAt':
        return [
          recipeSortByCreationDate(order),
          order === 'asc' ? 'Oldest' : 'Newest',
        ]
      case 'preparationTime':
        return [
          recipeSortByPrepTime(order),
          order === 'asc' ? 'Shortest' : 'Longest',
        ]
      case 'cookingTime':
        return [
          recipeSortByCookTime(order),
          order === 'asc' ? 'Shortest' : 'Longest',
        ]
      case 'difficultyLevel':
        return [
          recipeSortByDifficultyLevel(order),
          order === 'asc' ? 'Easiest' : 'Hardest',
        ]
      case 'servings':
        return [recipeSortByServings(order), order === 'asc' ? 'Least' : 'Most']
    }

    // default to updatedAt descending
    return [recipeSortByUpdatedAt(order), order === 'asc' ? 'Oldest' : 'Newest']
  }, [orderBy, order])

  const filteredRecipes = useMemo(
    () =>
      searchFilteredRecipes
        .filter(recipeFilterUnderMaxPrepTime(maxPrepTime))
        .filter(recipeFilterUnderMaxCookTime(maxCookTime))
        .filter(recipeFilterDifficultyLevel(difficultyLevel))
        .filter(recipeFilterServings(minServings, maxServings))
        .sort(sortFunction),
    [
      searchFilteredRecipes,
      maxPrepTime,
      maxCookTime,
      difficultyLevel,
      minServings,
      maxServings,
      sortFunction,
    ]
  )

  const shownRecipes = useMemo(() => {
    return filteredRecipes.slice(page * pageSize, (page + 1) * pageSize)
  }, [filteredRecipes, page, pageSize])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap gap-2">
        {paramNames?.search && (
          <UrlSearch
            placeholder="Search recipes..."
            paramName={paramNames?.search}
            className="min-w-[200px] flex-grow"
          />
        )}
        <RecipeFilters recipes={searchFilteredRecipes}>
          <Button
            variant="outline"
            className={numFiltersApplied > 0 ? 'pr-1' : undefined}
          >
            <MixerHorizontalIcon className="mr-2 h-5 w-5" />
            Filter
            {numFiltersApplied > 0 && (
              <Typography
                variant="tinyextralight"
                className="ml-2 rounded-full bg-secondary px-3 py-1 text-primary"
              >
                {numFiltersApplied}
              </Typography>
            )}
          </Button>
        </RecipeFilters>
        <Select
          value={orderBy}
          onValueChange={(val) => {
            console.log(val)
            setPage(null)
            switch (val) {
              case 'updatedAt':
              case 'creationDate':
                setOrder('desc')
                break
              case 'preparationTime':
              case 'cookingTime':
              case 'difficultyLevel':
              case 'servings':
                setOrder('asc')
                break
            }
            setOrderBy(val)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Order by" />
            <SelectContent>
              {RECIPE_ORDER_BY_OPTIONS_LIST.map(({ Icon, value, label }) => (
                <SelectItem key={value} value={value}>
                  <Typography className="flex flex-row items-center">
                    {!!Icon && <Icon className="mr-2 h-4 w-4" />}
                    {label}
                  </Typography>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Button
          variant="ghost"
          onClick={() => {
            setPage(null)
            setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }}
        >
          {orderLabel}{' '}
          {order == 'asc' ? (
            <ArrowDownNarrowWide className="ml-1 h-4 w-4" />
          ) : (
            <ArrowDownWideNarrow className="ml-1 h-4 w-4" />
          )}
        </Button>
      </div>
      <UrlPagination
        mode="client"
        title={title}
        count={filteredRecipes.length}
        paramNames={paramNames}
        defaultLimit={6}
      />
      <div
        className={cn(
          'grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3',
          gridClassName
        )}
      >
        {shownRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 * index }}
          >
            <RecipeCard
              cardKey={recipe.id}
              recipe={recipe}
              menus={menus}
              forceUpdate={forceUpdate}
              setForceUpdate={setForceUpdate}
            />
          </motion.div>
        ))}
      </div>
      <UrlPagination
        mode="client"
        count={filteredRecipes.length}
        paramNames={paramNames}
        defaultLimit={6}
        withPageInfo
      />
    </div>
  )
}
