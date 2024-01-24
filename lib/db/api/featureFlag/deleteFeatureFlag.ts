'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'

const deleteFeatureFlagQuery = db
  .delete(featureFlags)
  .where(eq(featureFlags.id, sql.placeholder('featureFlagId')))
  .prepare()

const deleteFeatureFlag = async (featureFlagId: number) => {
  await deleteFeatureFlagQuery.execute({ featureFlagId })
}

export default deleteFeatureFlag
