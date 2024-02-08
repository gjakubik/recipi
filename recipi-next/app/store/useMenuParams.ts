import { create } from 'zustand'
import { MenuSortBy, SortOptions } from '@/types'
import { MENU_QUERY } from '@/lib/constants'

interface MenuParamsState {
  authorId?: string
  limit: number
  page: number
  sort: SortOptions
  sortBy: MenuSortBy
  setAuthorId: (authorId: string) => void
  setLimit: (limit: number) => void
  setPage: (page: number) => void
  setSort: (sort: SortOptions) => void
  setSortBy: (sortBy: MenuSortBy) => void
  reset: () => void
}

const useMenuParams = create<MenuParamsState>((set) => ({
  auhtorId: undefined,
  limit: MENU_QUERY.limit,
  page: MENU_QUERY.page,
  sort: MENU_QUERY.sort,
  sortBy: MENU_QUERY.sortBy,
  setAuthorId: (authorId: string) => set({ authorId }),
  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
  setSort: (sort: SortOptions) => set({ sort }),
  setSortBy: (sortBy: MenuSortBy) => set({ sortBy }),
  reset: () =>
    set({
      authorId: undefined,
      limit: MENU_QUERY.limit,
      page: MENU_QUERY.page,
      sort: MENU_QUERY.sort,
      sortBy: MENU_QUERY.sortBy,
    }),
}))

export default useMenuParams
