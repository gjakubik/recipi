'use client'

import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { getIngredients } from '@/lib/db/api'

interface UseIngredientQueryProps {
  search?: string
  enabled?: boolean
}

export const useIngredientQuery = ({
  search,
  enabled,
}: UseIngredientQueryProps) => {
  return useQuery({
    queryKey: ['ingredients', search],
    queryFn: () => getIngredients({ search }),
    enabled,
  })
}
