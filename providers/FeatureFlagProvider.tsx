'use client'

import { createContext, PropsWithChildren, useMemo } from 'react'
import { User } from 'next-auth'
import { FeatureFlags, FeatureFlag } from '@/types'
import { ffListToMap } from '@/utils/featureFlags'
// Create a react provider that takes in a set of feature flags and provides it to the reast of the app

export const FeatureFlagContext = createContext<FeatureFlags | null>(null)

interface FeatureFlagProviderProps extends PropsWithChildren {
  user?: User
  featureFlags: FeatureFlag[]
}

export const FeatureFlagProvider = ({
  user,
  featureFlags,
  children,
}: FeatureFlagProviderProps) => {
  const featureFlagsMap = useMemo(
    () => ffListToMap(featureFlags, user?.role === 'admin'),
    [featureFlags]
  )

  return (
    <FeatureFlagContext.Provider value={featureFlagsMap}>
      {children}
    </FeatureFlagContext.Provider>
  )
}
