'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs'
import { GetMenusResult, Recipe } from '@/types'
import { DEFAULT_PARAM_NAMES, RECIPE_QUERY } from '@/lib/constants'
import {
  recipeSortByUpdatedAt,
  recipeSortByCreationDate,
} from '@/utils/sorting'
import {
  recipeFilterUnderMaxPrepTime,
  recipeFilterUnderMaxCookTime,
  recipeFilterDifficultyLevel,
  recipeSearchFilter,
} from '@/utils/filtering'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { UrlPagination } from '@/components/UrlPagination'
import { RecipeCard } from '@/components/recipe/RecipeCard'
import { RecipeFilters } from '@/components/recipe/RecipeFilters'
import { UrlSearch } from '@/components/UrlSearch'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import {
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  Filter,
  SlidersHorizontal,
} from 'lucide-react'

interface FullClientRecipeListProps {
  recipes: Recipe[]
  paramNames?: {
    page?: string
    limit?: string
    order?: string
    orderBy?: string
    search?: string
    maxPrepTime?: string
    maxCookTime?: string
    minServings?: string
    maxServings?: string
    difficultyLevel?: string
  }
  initialMenus?: GetMenusResult
  gridClassName?: string
  title?: string
}

const sortOptions = ['asc', 'desc'] as const

export const FullClientRecipeList = ({
  recipes,
  paramNames,
  initialMenus,
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
    parseAsString
  )

  const numFiltersApplied = useMemo(() => {
    return (
      (maxPrepTime !== 'INF' ? 1 : 0) +
      (maxCookTime !== 'INF' ? 1 : 0) +
      (minServings ? 1 : 0) +
      (maxServings !== 25 ? 1 : 0) +
      (difficultyLevel ? 1 : 0)
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
    if (orderBy === 'creationDate') {
      return [
        recipeSortByCreationDate(order),
        order === 'asc' ? 'Oldest' : 'Newest',
      ]
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
        .sort(sortFunction),
    [
      searchFilteredRecipes,
      maxPrepTime,
      maxCookTime,
      difficultyLevel,
      sortFunction,
    ]
  )

  const shownRecipes = useMemo(() => {
    return filteredRecipes.slice(page * pageSize, page * pageSize + pageSize)
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
        <Button
          variant="ghost"
          onClick={() => {
            setPage(null)
            setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }}
        >
          {orderLabel}{' '}
          {order == 'asc' ? (
            <ChevronUpIcon className="ml-1 h-3 w-3" />
          ) : (
            <ChevronDownIcon className="ml-1 h-3 w-3" />
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
              initialMenus={initialMenus}
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
