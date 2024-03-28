'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema-pg'
import { FeatureFlag } from '@/types'

const getFeatureFlagQuery = db
  .select({
    id: featureFlags.id,
    name: featureFlags.name,
    description: featureFlags.description,
    isActive: featureFlags.isActive,
  })
  .from(featureFlags)
  .prepare('getFeatureFlagQuery')

const getFeatureFlag = async (): Promise<FeatureFlag[]> => {
  const featureFlags = await getFeatureFlagQuery.execute()

  return featureFlags
}

export default getFeatureFlag
