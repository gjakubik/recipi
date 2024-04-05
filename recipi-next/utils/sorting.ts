import { Recipe } from '@/types'
import { timeInSeconds } from '@/lib/utils'
import { parseServings } from '@/utils/servings'

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

// order ['easy', 'medium', 'hard'] ascending
// order ['hard', 'medium', 'easy'] descending
export function recipeSortByDifficultyLevel(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    const difficultyOrder = ['easy', 'medium', 'hard']
    const aIndex = difficultyOrder.indexOf(a.difficultyLevel)
    const bIndex = difficultyOrder.indexOf(b.difficultyLevel)

    if (order === 'asc') {
      return aIndex - bIndex
    } else {
      return bIndex - aIndex
    }
  }
}

export function recipeSortByServings(order: 'asc' | 'desc') {
  return (a: Recipe, b: Recipe) => {
    const [aMin, aMax] = parseServings(a.servings)
    const [bMin, bMax] = parseServings(b.servings)

    const aAvg = (aMin + aMax) / 2
    const bAvg = (bMin + bMax) / 2

    if (order === 'asc') {
      return aAvg - bAvg
    } else {
      return bAvg - aAvg
    }
  }
}
