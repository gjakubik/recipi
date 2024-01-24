'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'

const getFeatureFlagQuery = db
  .select({
    id: featureFlags.id,
    name: featureFlags.name,
    description: featureFlags.description,
    isActive: featureFlags.isActive,
  })
  .from(featureFlags)
  .where(eq(featureFlags.id, sql.placeholder('featureFlagId')))
  .prepare()

const getFeatureFlag = async (featureFlagId: number) => {
  const [featureFlag] = await getFeatureFlagQuery.execute({ featureFlagId })

  if (!featureFlag) {
    throw new Error('FeatureFlag not found')
  }

  return featureFlag
}

export default getFeatureFlag
