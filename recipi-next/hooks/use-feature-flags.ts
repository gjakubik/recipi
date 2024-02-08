'use client'

import { useContext } from 'react'
import { FeatureFlagContext } from '@/providers/FeatureFlagProvider'
import { FEATURE_FLAG_OPTIONS } from '@/lib/constants'
import { FeatureFlags } from '@/types'

export const useFeatureFlags = () => {
  const value = useContext(FeatureFlagContext)

  // if value is null just return object with all false values
  if (!value) {
    console.log(FEATURE_FLAG_OPTIONS)
    const flags = FEATURE_FLAG_OPTIONS.reduce((acc, flag) => {
      acc[flag as keyof FeatureFlags] = false
      return acc
    }, {} as FeatureFlags)
    return flags
  }

  return value
}
