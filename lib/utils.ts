import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import _ from 'lodash'
import { ABBREVIATION_TO_UNIT, MENU_QUERY } from './constants'
import { MenuListQueryParams } from '@/types/params'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMenuQueryString = (params: MenuListQueryParams) => {
  const { page, limit, sort, sortBy } = params

  const queryParams = new URLSearchParams()
  if (page && page !== MENU_QUERY.page.toString())
    queryParams.append('page', page)
  if (limit && limit !== MENU_QUERY.limit.toString())
    queryParams.append('limit', limit)
  if (sort && sort !== MENU_QUERY.sort) queryParams.append('sort', sort)
  if (sortBy && sortBy !== MENU_QUERY.sortBy)
    queryParams.append('sortBy', sortBy)

  return queryParams.toString()
}

// Handle names like "Mark John Doe", "Mark Doe", "Mark"
export const getInitials = (name: string) => {
  const names = name.split(' ')
  const initials = names.map((n) => n[0])
  return initials.join('').toUpperCase()
}

export const abbToUnit = (abb: string) => {
  try {
    return (
      ABBREVIATION_TO_UNIT[
        _.trimEnd(abb, 's') as keyof typeof ABBREVIATION_TO_UNIT
      ] || abb
    )
  } catch (e) {
    return abb
  }
}

// eg 1 1/2 + 1 2/3 = 3 1/6
export const addFractions = (a: string, b: string) => {
  const [aWhole, aNumerator, aDenominator] = a.split(' ')
  const [bWhole, bNumerator, bDenominator] = b.split(' ')

  let whole = parseInt(aWhole) + parseInt(bWhole)
  let numerator = parseInt(aNumerator) * parseInt(bDenominator)
  numerator += parseInt(bNumerator) * parseInt(aDenominator)
  let denominator = parseInt(aDenominator) * parseInt(bDenominator)

  if (numerator >= denominator) {
    whole += Math.floor(numerator / denominator)
    numerator = numerator % denominator
  }

  return `${whole} ${numerator}/${denominator}`
}

export const fractionToFloat = (str: string) => {
  // Split the string into parts using space as a delimiter
  const parts = _.split(str, ' ')

  // Initialize the result
  let result = 0

  // Loop through the parts
  _.forEach(parts, (part) => {
    if (part.includes('/')) {
      // If the part is a fraction, split it further and perform division
      const fractionParts = _.split(part, '/')
      const numerator = _.parseInt(fractionParts[0])
      const denominator = _.parseInt(fractionParts[1])
      result += numerator / denominator
    } else {
      // If the part is an integer, parse it and add it to the result
      result += _.parseInt(part)
    }
  })

  return result
}

// default to partials where the whole number is in front
export const floatToFraction = (value: number) => {
  //if it is not a float, return the integer
  if (value % 1 === 0) return value.toString()
  const tolerance = 1.0e-6
  let h1 = 1
  let h2 = 0
  let k1 = 0
  let k2 = 1
  let b = value
  do {
    const a = Math.floor(b)
    let aux = h1
    h1 = a * h1 + h2
    h2 = aux
    aux = k1
    k1 = a * k1 + k2
    k2 = aux
    b = 1 / (b - a)
  } while (Math.abs(value - h1 / k1) > value * tolerance)

  // Extract the whole number part if it exists
  const wholePart = Math.floor(h1 / k1)
  const fractionPartNumerator = h1 % k1

  // Format the output
  return wholePart > 0
    ? `${wholePart} ${fractionPartNumerator}/${k1}`
    : `${fractionPartNumerator}/${k1}`
}

export const removeServings = (s: string) => {
  return s.replace('servings', '').trim()
}

export const isZero = (value?: string | null) => {
  return (
    value === '0' ||
    value === '00' ||
    value === '000' ||
    value === '00:00:00' ||
    value === '000:00:00' ||
    value === '00:00' ||
    value === '000:00'
  )
}

// value: 'hhh:mm:ss'
export const timeValueToLabel = (value?: string | null): string | undefined => {
  if (!value) return undefined

  const [hours, minutes, seconds] = value.split(':')
  const hasHours = !isZero(hours)
  const hasMinutes = !isZero(minutes)
  const hasSeconds = !isZero(seconds)

  const hoursLabel = hasHours
    ? `${parseInt(hours)} hour${hours !== '01' ? 's' : ''}`
    : ''
  const minutesLabel = hasMinutes
    ? `${parseInt(minutes)} minute${minutes !== '01' ? 's' : ''}`
    : ''
  const secondsLabel = hasSeconds
    ? `${parseInt(seconds)} second${seconds !== '01' ? 's' : ''}`
    : ''

  const components = [hoursLabel, minutesLabel, secondsLabel].filter(Boolean)

  if (components.length === 3) {
    // Shorten format when all three components are present
    return `${parseInt(hours)}h ${parseInt(minutes)}m ${parseInt(seconds)}s`
  } else {
    // Join non-empty components with spaces
    return components.join(' ')
  }
}

export const timeToValues = (time: string) => {
  const [hours, minutes, seconds] = time.split(':')
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  }
}

export const timeToStrValues = (time: string) => {
  const [hours, minutes, seconds] = time.split(':')
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

export const setTimeByType = (time: string, value: string, type: string) => {
  const { hours, minutes, seconds } = timeToValues(time)

  switch (type) {
    case 'hours':
      return `${value}:${minutes}:${seconds}`
    case 'minutes':
      return `${hours}:${value}:${seconds}`
    case 'seconds':
      return `${hours}:${minutes}:${value}`
    default:
      return time
  }
}

// instructions come as a string like this <instruction>some instruction here</instruction><instruction>another instruction here</instruction>
export const parseInstructions = (instructions?: string | null) => {
  const parsedInstructions =
    instructions
      ?.split('<instruction>')
      .filter((i) => i !== '')
      .map((i) => i.replace('</instruction>', '')) || []

  return parsedInstructions
}
