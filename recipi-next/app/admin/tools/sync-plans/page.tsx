import { Suspense } from 'react'

import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { Plans } from '@/components/plans/Plans'
import { SyncPlansButton } from './SyncPlansButton'

export default function SyncPlansPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-row justify-between">
          <Typography variant="h2xb">Sync Plans</Typography>
          <SyncPlansButton />
        </div>
        <Separator className="w-full" />
      </div>
      <Suspense fallback={<p>Loading plans...</p>}>
        <Plans />
      </Suspense>
    </div>
  )
}
