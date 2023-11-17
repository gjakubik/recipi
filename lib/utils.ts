import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TIME_TO_LABEL, UNIT_TO_LABEL } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeValueToLabel = (value?: string | null) => {
  try {
    return TIME_TO_LABEL[value as keyof typeof TIME_TO_LABEL]
  } catch {
    return 'Unknown'
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
