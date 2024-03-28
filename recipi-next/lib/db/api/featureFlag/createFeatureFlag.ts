'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema-pg'
import getFeatureFlag from './getFeatureFlag'
import { FeatureFlagFormValues } from '@/lib/validations/featureFlag'

const createFeatureFlag = async (featureFlag: FeatureFlagFormValues) => {
  const [newFeatureFlag] = await db
    .insert(featureFlags)
    .values({
      name: featureFlag.name,
      description: featureFlag.description,
      isActive: featureFlag.isActive,
    })
    .returning()
    .execute()

  console.log('newFeatureFlag', newFeatureFlag)

  if (!newFeatureFlag) {
    throw new Error('Failed to create featureFlag')
  }

  return newFeatureFlag
}

export default createFeatureFlag
