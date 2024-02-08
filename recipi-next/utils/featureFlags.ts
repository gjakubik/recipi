import { FEATURE_FLAG_OPTIONS } from '@/lib/constants'
import { FeatureFlag, FeatureFlags } from '@/types'

export const ffListToMap = (featureFlags: FeatureFlag[], adminMode?: boolean) =>
  featureFlags.reduce((acc, flag) => {
    // cheack if feature flag name is in the type FeatureFlagOptions, which is a string union of the feature flag names as keys
    if (FEATURE_FLAG_OPTIONS.find((option) => option === flag.name)) {
      acc[flag.name as keyof FeatureFlags] = adminMode ? true : flag.isActive
    } else {
      console.warn(
        `Feature flag ${flag.name} not found in FEATURE_FLAG_OPTIONS`
      )
    }

    return acc
  }, {} as FeatureFlags)
