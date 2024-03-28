'use server'

import { db } from '@/lib/db'
import { featureFlags } from '@/lib/db/schema-pg'
import getFeatureFlag from './getFeatureFlag'
import { eq } from 'drizzle-orm'
import { FeatureFlagFormValues } from '@/lib/validations/featureFlag'

const updateFeatureFlag = async (ff: FeatureFlagFormValues) => {
  if (!ff.id) {
    throw new Error('FeatureFlag id is required')
  }

  await db
    .update(featureFlags)
    .set({
      name: ff.name,
      description: ff.description,
      isActive: ff.isActive,
    })
    .where(eq(featureFlags.id, ff.id))
    .returning({ insertedId: featureFlags.id })

  const updatedFeatureFlag = await getFeatureFlag(ff.id)

  if (!updatedFeatureFlag) {
    throw new Error('Failed to update featureFlag')
  }

  return updatedFeatureFlag
}

export default updateFeatureFlag
