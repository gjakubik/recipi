'use client'

import { useEffect } from 'react'
import { GetMenusResult, MenuQuery } from '@/types'
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import useMenuParams from '@/app/store/useMenuParams'
import { getMenus } from '@/lib/db/api'

interface UseMenuQueryProps {
  initialData?: GetMenusResult
  params: MenuQuery & { authorId?: string }
}

export const useMenuQuery = ({ initialData, params }: UseMenuQueryProps) => {
  const queryClient = useQueryClient()

  const { authorId, limit, page, sort, sortBy } = params

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['menus', { authorId, limit, page, sort, sortBy }],
    queryFn: () => getMenus({ authorId, limit, page, sort, sortBy }),
    initialData: initialData,
    placeholderData: keepPreviousData,
  })

  //Prefetch the next page
  useEffect(() => {
    if (!isPlaceholderData && limit * page < (data?.count || 0)) {
      queryClient.prefetchQuery({
        queryKey: ['menus', { authorId, limit, page: page + 1, sort, sortBy }],
        queryFn: () =>
          getMenus({ authorId, limit, page: page + 1, sort, sortBy }),
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
    menus: data?.menus || [],
    count: data?.count || 0,
  }
}
