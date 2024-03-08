'use client'

import { useQueryState } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { getIngredients } from '@/lib/db/api'

interface UseIngredientQueryProps {
  search?: string
}

export const useIngredientQuery = ({ search }: UseIngredientQueryProps) => {
  return useQuery({
    queryKey: ['ingredients', search],
    queryFn: () => getIngredients({ search }),
  })
}
