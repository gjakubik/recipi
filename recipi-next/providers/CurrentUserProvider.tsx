'use client'

import { createContext, PropsWithChildren, useMemo } from 'react'
import { User } from 'next-auth'

export const CurrentUserContext = createContext<User | undefined>(undefined)

interface CurrentUserProviderProps extends PropsWithChildren {
  user?: User
}

export const CurrentUserProvider = ({
  user,
  children,
}: CurrentUserProviderProps) => {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  )
}
