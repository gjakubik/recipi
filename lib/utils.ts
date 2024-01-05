import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import _ from 'lodash'
import { ABBREVIATION_TO_UNIT, MENU_QUERY } from './constants'
import { MenuListQueryParams } from '@/types/url-params'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMenuQueryString = (params: MenuListQueryParams) => {
  const { page, limit, sort, sortBy } = params

  const queryParams = new URLSearchParams()
  if (page && page !== MENU_QUERY.PAGE.toString())
    queryParams.append('page', page)
  if (limit && limit !== MENU_QUERY.LIMIT.toString())
    queryParams.append('limit', limit)
  if (sort && sort !== MENU_QUERY.SORT) queryParams.append('sort', sort)
  if (sortBy && sortBy !== MENU_QUERY.SORT_BY)
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
