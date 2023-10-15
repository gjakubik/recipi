import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeValueToLabel = (value: string) => {
  switch (value) {
    case '5-min':
      return '5 Minutes'
    case '10-min':
      return '10 Minutes'
    case '15-min':
      return '15 Minutes'
    case '30-min':
      return '30 Minutes'
    case '45-min':
      return '45 Minutes'
    case '1-hr':
      return '1 Hour'
    case '1-hr-30-min':
      return '1 1/2 Hours'
    case '2-hr':
      return '2 Hours'
    case '3-hr':
      return '3 Hours'
    default:
      return 'None'
  }
}
