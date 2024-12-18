import { RecipeQuery, MenuQuery } from '@/types'
import {
  Clock,
  Users,
  Calendar,
  GraduationCap,
  CaseSensitive,
} from 'lucide-react'

export const FEATURE_FLAG_OPTIONS = [
  'canSeeGroceryList',
  'canSeeNewAIRecipeUpload',
  'useIngredientSelector',
] as const

export const DEFAULT_PARAM_NAMES = {
  page: 'page',
  limit: 'pageSize',
  order: 'order',
  orderBy: 'orderBy',
  search: 'search',
  maxPrepTime: 'maxPrepTime',
  maxCookTime: 'maxCookTime',
  maxTotalTime: 'maxTotalTime',
  minServings: 'minServings',
  maxServings: 'maxServings',
  servings: 'servings',
  difficultyLevel: 'difficultyLevel',
  rating: 'rating',
}

export const RECIPE_ORDER_BY_OPTIONS_LIST = [
  {
    Icon: Clock,
    value: 'preparationTime',
    label: 'Prep Time',
  },
  {
    Icon: Clock,
    value: 'cookingTime',
    label: 'Cook Time',
  },
  {
    Icon: Users,
    value: 'servings',
    label: 'Servings',
  },
  {
    Icon: GraduationCap,
    value: 'difficultyLevel',
    label: 'Difficulty',
  },
  {
    Icon: Calendar,
    value: 'updatedAt',
    label: 'Updated At',
  },
  {
    Icon: Calendar,
    value: 'creationDate',
    label: 'Creation Date',
  },
]

export const MENU_ORDER_BY_OPTIONS_LIST = [
  {
    Icon: Calendar,
    value: 'updatedAt',
    label: 'Updated At',
  },
  {
    Icon: Calendar,
    value: 'creationDate',
    label: 'Creation Date',
  },
  {
    Icon: CaseSensitive,
    value: 'title',
    label: 'Title',
  },
]

export const RECIPE_QUERY: RecipeQuery = {
  limit: 6,
  page: 0,
  sort: 'desc',
  sortBy: 'updatedAt',
}

export const MENU_QUERY: MenuQuery = {
  limit: 5,
  page: 0,
  sort: 'desc',
  sortBy: 'updatedAt',
}

export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export const ABBREVIATION_TO_UNIT = {
  t: 'Teaspoon',
  tsp: 'Teaspoon',
  T: 'Tablespoon',
  TB: 'Tablespoon',
  Tbl: 'Tablespoon',
  Tbsp: 'Tablespoon',
  tbsp: 'Tablespoon',
  C: 'Cup',
  c: 'Cup',
  oz: 'Ounce',
  lb: 'Pound',
  mL: 'Milliliter',
  ml: 'Milliliter',
  L: 'Liter',
  l: 'Liter',
  g: 'Gram',
  kg: 'Kilogram',
  pt: 'Pint',
  pkg: 'Package',
  qt: 'Quart',
}

export const UNITS = [
  'Teaspoon',
  'Tablespoon',
  'Cup',
  'Ounce',
  'Pound',
  'Milliliter',
  'Liter',
  'Gram',
  'Kilogram',
  'Pint',
]
