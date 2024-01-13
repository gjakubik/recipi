import { create } from 'zustand'
import { RecipeSortBy, SortOptions } from '@/types'
import { RECIPE_QUERY } from '@/lib/constants'

interface RecipeParamsState {
  authorId?: string
  limit: number
  page: number
  sort: SortOptions
  sortBy: RecipeSortBy
  setAuthorId: (authorId: string) => void
  setLimit: (limit: number) => void
  setPage: (page: number) => void
  setSort: (sort: SortOptions) => void
  setSortBy: (sortBy: RecipeSortBy) => void
  reset: () => void
}

const useRecipeParams = create<RecipeParamsState>((set) => ({
  authorId: undefined,
  limit: RECIPE_QUERY.limit,
  page: RECIPE_QUERY.page,
  sort: RECIPE_QUERY.sort,
  sortBy: RECIPE_QUERY.sortBy,
  setAuthorId: (authorId: string) => set({ authorId }),
  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
  setSort: (sort: SortOptions) => set({ sort }),
  setSortBy: (sortBy: RecipeSortBy) => set({ sortBy }),
  reset: () =>
    set({
      limit: RECIPE_QUERY.limit,
      page: RECIPE_QUERY.page,
      sort: RECIPE_QUERY.sort,
      sortBy: RECIPE_QUERY.sortBy,
    }),
}))

export default useRecipeParams
