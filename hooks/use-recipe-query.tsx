'use client'

import { useEffect } from 'react'
import { GetRecipesResult, RecipeQuery } from '@/types'
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { getRecipes } from '@/lib/db/api'

interface UseRecipeQueryProps {
  initialData?: GetRecipesResult
  params: RecipeQuery & { authorId?: string }
}

export const useRecipeQuery = ({
  initialData,
  params,
}: UseRecipeQueryProps) => {
  const queryClient = useQueryClient()

  const { authorId, limit, page, sort, sortBy } = params

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['recipes', { authorId, limit, page, sort, sortBy }],
    queryFn: () => getRecipes({ authorId, limit, page, sort, sortBy }),
    initialData: initialData,
    placeholderData: keepPreviousData,
  })

  //Prefetch the next page
  useEffect(() => {
    if (!isPlaceholderData && limit * page < (data?.count || 0)) {
      queryClient.prefetchQuery({
        queryKey: [
          'recipes',
          { authorId, limit, page: page + 1, sort, sortBy },
        ],
        queryFn: () =>
          getRecipes({ authorId, limit, page: page + 1, sort, sortBy }),
      })
    }
  }, [
    data,
    isPlaceholderData,
    queryClient,
    authorId,
    limit,
    page,
    sort,
    sortBy,
  ])

  return {
    recipes: data?.recipes || [],
    count: data?.count || 0,
  }
}
