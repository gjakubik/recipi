export type SortOptions = 'asc' | 'desc'

interface BaseQuery {
  limit: number
  page: number
  sort: SortOptions
}

export type MenuSortBy = 'title' | 'creationDate' | 'updatedAt'

interface MenuQuery extends BaseQuery {
  sortBy: MenuSortBy
}

// TODO: Add more sort options
export type RecipeSortBy = 'title' | 'creationDate' | 'updatedAt'

interface RecipeQuery extends BaseQuery {
  sortBy: RecipeSortBy
}

export type ListQueryParams = {
  page?: string
  limit?: string
  sort?: string
  sortBy?: string
}
