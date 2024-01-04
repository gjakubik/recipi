import { create } from 'zustand'
import { MENU_QUERY } from '@/lib/constants'

interface MenuParamsState {
  limit: number
  page: number
  sort: 'asc' | 'desc'
  sortBy: 'title' | 'creationDate' | 'updatedAt'
  setLimit: (limit: number) => void
  setPage: (page: number) => void
  setSort: (sort: 'asc' | 'desc') => void
  setSortBy: (sortBy: 'title' | 'creationDate' | 'updatedAt') => void
}

const useMenuParams = create<MenuParamsState>((set) => ({
  limit: MENU_QUERY.LIMIT,
  page: MENU_QUERY.PAGE,
  sort: MENU_QUERY.SORT,
  sortBy: MENU_QUERY.SORT_BY,
  setLimit: (limit: number) => set({ limit }),
  setPage: (page: number) => set({ page }),
  setSort: (sort: 'asc' | 'desc') => set({ sort }),
  setSortBy: (sortBy: 'title' | 'creationDate' | 'updatedAt') =>
    set({ sortBy }),
}))

export default useMenuParams
