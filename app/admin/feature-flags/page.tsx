import { getCurrentUser } from '@/lib/session'
import { getFeatureFlags } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { UpsertFeatureFlagModal } from '@/components/modals/UpsertFeatureFlag'
import { FeatureFlagList } from './FeatureFlagList'
import { Plus } from 'lucide-react'

export default async function FeatureFlagPage() {
  const user = await getCurrentUser()
  const featureFlags = await getFeatureFlags()

  //redirect to home if not logged in
  if (user?.role !== 'admin') {
    return <Typography>Please log in to edit feature flags</Typography>
  }

  return (
    <>
      <Typography variant="h2">Feature Flags</Typography>
      {featureFlags.length !== 0 ? (
        <>
          <FeatureFlagList featureFlags={featureFlags} />
          <div className="flex justify-end">
            <UpsertFeatureFlagModal>
              <Button className="flex gap-2">
                <Plus width={16} /> Feature Flag
              </Button>
            </UpsertFeatureFlagModal>
          </div>
        </>
      ) : (
        <div className="h-72 flex flex-col gap-2 items-center justify-center">
          {/* Add modal that allows for upload of Feature Flag */}
          <Typography>No feature flags found</Typography>
          <UpsertFeatureFlagModal>
            <Button className="flex gap-2">
              <Plus width={16} /> Feature Flag
            </Button>
          </UpsertFeatureFlagModal>
        </div>
      )}
    </>
  )
}
