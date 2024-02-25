'use client'

import { useContext } from 'react'
import { CurrentUserContext } from '@/providers/CurrentUserProvider'

export const useCurrentUser = () => {
  const value = useContext(CurrentUserContext)

  return value
}
