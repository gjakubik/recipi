import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TIME_TO_LABEL, UNIT_TO_LABEL } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const unitValueToLabel = (value?: string | null) => {
  try {
    return UNIT_TO_LABEL[value as keyof typeof UNIT_TO_LABEL]
  } catch {
    return 'Unknown'
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
