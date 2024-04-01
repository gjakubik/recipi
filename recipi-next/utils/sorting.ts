import { Recipe } from '@/types'
import { timeInSeconds } from '@/lib/utils'

export function recipeSortByUpdatedAt(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    if (order === 'asc') {
      return a.updatedAt.getTime() - b.updatedAt.getTime()
    } else {
      return b.updatedAt.getTime() - a.updatedAt.getTime()
    }
  }
}

export function recipeSortByCreationDate(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    if (order === 'asc') {
      return a.creationDate.getTime() - b.creationDate.getTime()
    } else {
      return b.creationDate.getTime() - a.creationDate.getTime()
    }
  }
}

export const compareTimes = (a: string, b: string) => {
  const aSeconds = timeInSeconds(a)
  const bSeconds = timeInSeconds(b)

  return aSeconds - bSeconds
}

export function recipeSortByPrepTime(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    if (order === 'asc') {
      return compareTimes(a.preparationTime, b.preparationTime)
    } else {
      return compareTimes(b.preparationTime, a.preparationTime)
    }
  }
}

export function recipeSortByCookTime(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    if (order === 'asc') {
      return compareTimes(a.cookingTime, b.cookingTime)
    } else {
      return compareTimes(b.cookingTime, a.cookingTime)
    }
  }
}
