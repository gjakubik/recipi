import { Suspense } from 'react'
import { Plans } from '@/components/plans/Plans'
import { Subscriptions } from '@/components/subscriptions/Subscriptions'

export const dynamic = 'force-dynamic'

export default function BillingPage() {
  return (
    <div>
      <Suspense fallback={<p>Loading subscriptions...</p>}>
        <Subscriptions />
      </Suspense>
      <Suspense fallback={<p>Loading plans...</p>}>
        <Plans />
      </Suspense>
    </div>
  )
}
