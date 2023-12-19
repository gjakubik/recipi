import { create } from 'zustand'

interface SearchState {
  search: string
  setSearch: (search: string) => void
}

const useSearch = create<SearchState>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
}))

export default useSearch
