'use client'

import { useState } from 'react'
import { User } from 'next-auth'
import { GetMenusResult, GetRecipesResult } from '@/types'
import { RECIPE_QUERY } from '@/lib/constants'
import useSearch from '@/app/store/useSearch'

import { RecipeCard } from '@/components/recipe/RecipeCard'
import { ClientPagination } from '../ClientPagintation'
import { useRecipeQuery } from '@/hooks/use-recipe-query'

interface RecipeListPaginatedProps {
  initialData: GetRecipesResult
  user?: User
  initialMenus: GetMenusResult
  showUserRecipes?: boolean
}

export function RecipeListPaginated({
  initialMenus,
  initialData,
  user,
  showUserRecipes,
}: RecipeListPaginatedProps) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            cardKey={recipe.id}
            recipe={recipe}
            initialMenus={initialMenus}
            user={user}
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
