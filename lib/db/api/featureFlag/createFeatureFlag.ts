'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema'
import getFeatureFlag from './getFeatureFlag'
import { FeatureFlagFormValues } from '@/lib/validations/featureFlag'

const createFeatureFlag = async (featureFlag: FeatureFlagFormValues) => {
  const newFeatureFlagExec = await db
    .insert(featureFlags)
    .values({
      name: featureFlag.name,
      description: featureFlag.description,
      isActive: featureFlag.isActive,
    })
    .execute()

  // Get newly created featureFlag
  const newFeatureFlag = await getFeatureFlag(
    parseInt(newFeatureFlagExec.insertId)
  )

  if (!newFeatureFlag) {
    throw new Error('Failed to create featureFlag')
  }

  return newFeatureFlag
}

export default createFeatureFlag
