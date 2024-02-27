'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { useQueryState, parseAsInteger } from 'nuqs'
import { GetMenusResult, Recipe } from '@/types'

import { UrlPagination } from '@/components/UrlPagination'
import { RecipeCard } from '@/components/recipe/RecipeCard'
import { RECIPE_QUERY } from '@/lib/constants'

interface FullClientRecipeListProps {
  recipes: Recipe[]
  paramNames: {
    page: string
    limit: string
  }
  initialMenus?: GetMenusResult
  gridClassName?: string
}

export const FullClientRecipeList = ({
  recipes,
  paramNames,
  initialMenus,
  gridClassName,
}: FullClientRecipeListProps) => {
  const { page: pageParam, limit: limitParam } = paramNames
  const [forceUpdate, setForceUpdate] = useState(0)
  const [pageState] = useQueryState(pageParam, parseAsInteger)
  const [pageSizeState] = useQueryState(limitParam, parseAsInteger)

  const page = useMemo(() => pageState || 0, [pageState])
  const pageSize = useMemo(
    () => pageSizeState || RECIPE_QUERY.limit,
    [pageSizeState]
  )

  const shownRecipes = useMemo(() => {
    return recipes.slice(page * pageSize, page * pageSize + pageSize)
  }, [recipes, page, pageSize])

  return (
    <div className="flex flex-col gap-2">
      <UrlPagination
        mode="client"
        title="Recipes"
        count={recipes.length}
        paramNames={paramNames}
        defaultLimit={6}
      />
      <div
        className={cn(
          'grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3',
          gridClassName
        )}
      >
        {shownRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard
              cardKey={recipe.id}
              recipe={recipe}
              initialMenus={initialMenus}
              forceUpdate={forceUpdate}
              setForceUpdate={setForceUpdate}
            />
          </div>
        ))}
      </div>
      <UrlPagination
        mode="client"
        count={recipes.length}
        paramNames={paramNames}
        defaultLimit={6}
        withPageInfo
      />
    </div>
  )
}
