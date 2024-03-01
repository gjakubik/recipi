'use client'

import { useState } from 'react'
import { User } from 'next-auth'
import { GetMenusResult, GetRecipesResult } from '@/types'
import { RECIPE_QUERY } from '@/lib/constants'
import useSearch from '@/app/store/useSearch'
import { useRecipeQuery } from '@/hooks/use-recipe-query'
import { useCurrentUser } from '@/hooks/use-current-user'

import { RecipeCard } from '@/components/recipe/RecipeCard'
import { ClientPagination } from '../ClientPagintation'

interface RecipeListPaginatedProps {
  initialData: GetRecipesResult
  initialMenus: GetMenusResult
  showUserRecipes?: boolean
}

export function RecipeListPaginated({
  initialMenus,
  initialData,
  showUserRecipes,
}: RecipeListPaginatedProps) {
  const user = useCurrentUser()
  const { search } = useSearch()
  const [forceUpdate, setForceUpdate] = useState(0)

  const [recipeParams, setRecipeParams] = useState({
    ...RECIPE_QUERY,
    authorId: showUserRecipes ? user?.id : undefined,
  })

  // const { limit, page, setPage, setLimit } = useRecipeParams()

  const { recipes, count } = useRecipeQuery({
    initialData,
    params: recipeParams,
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            cardKey={recipe.id}
            recipe={recipe}
            initialMenus={initialMenus}
            forceUpdate={forceUpdate}
            setForceUpdate={setForceUpdate}
          />
        ))}
      </div>
      <ClientPagination
        count={count}
        limit={recipeParams.limit}
        page={recipeParams.page}
        setPage={(value) => setRecipeParams({ ...recipeParams, page: value })}
        setLimit={(value) => setRecipeParams({ ...recipeParams, limit: value })}
      />
    </div>
  )
}
