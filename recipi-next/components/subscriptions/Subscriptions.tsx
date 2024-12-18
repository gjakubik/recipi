import { cn } from '@/lib/utils'
import { isValidSubscription } from '@/utils/lemonsqueezy'
import { db } from '@/lib/db'
import { plans } from '@/lib/db/schema-pg'
import { type NewSubscription } from '@/types/schema'
import { type SubscriptionStatusType } from '@/types/lemonsqueezy'
import { getUserSubscriptions } from '@/lib/db/api'
import { Section } from '@/components/Section'
import { ChangePlan } from '../plans/ChangePlanButton'
import { SubscriptionActions } from './SubscriptionActions'
import { SubscriptionDate } from './SubscriptionDate'
import { SubscriptionPrice } from './SubscriptionPrice'
import { SubscriptionStatus } from './SubscriptionStatus'

const SUBSCRIPTION_STATUSES = {
  active: 'active',
  paused: 'paused',
  cancelled: 'cancelled',
} as const

export async function Subscriptions() {
  const userSubscriptions = await getUserSubscriptions()
  const allPlans = await db.select().from(plans)

  if (userSubscriptions.length === 0) {
    return (
      <p className="not-prose mb-2">
        It appears that you do not have any subscriptions. Please sign up for a
        plan below.
      </p>
    )
  }

  // Show active subscriptions first, then paused, then canceled
  const sortedSubscriptions = userSubscriptions.sort((a, b) => {
    if (
      a.status === SUBSCRIPTION_STATUSES.active &&
      b.status !== SUBSCRIPTION_STATUSES.active
    ) {
      return -1
    }

    if (
      a.status === SUBSCRIPTION_STATUSES.paused &&
      b.status === SUBSCRIPTION_STATUSES.cancelled
    ) {
      return -1
    }

    return 0
  })

  return (
    <Section className="not-prose relative">
      {sortedSubscriptions.map(
        (subscription: NewSubscription, index: number) => {
          const plan = allPlans.find((p) => p.id === subscription.planId)
          const status = subscription.status as SubscriptionStatusType

          if (!plan) {
            throw new Error('Plan not found')
          }

          return (
            <Section.Item
              key={index}
              className="flex-col items-stretch justify-center gap-2"
            >
              <header className="flex items-center justify-between gap-3">
                <div className="min-h-8 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2
                    className={cn(
                      'text-surface-900 text-lg',
                      !isValidSubscription(status) && 'text-inherit'
                    )}
                  >
                    {plan.productName} ({plan.name})
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {isValidSubscription(status) && (
                    <ChangePlan planId={subscription.planId} />
                  )}

                  <SubscriptionActions subscription={subscription} />
                </div>
              </header>

              <div className="flex flex-wrap items-center gap-2">
                <SubscriptionPrice
                  endsAt={subscription.endsAt}
                  interval={plan.interval}
                  intervalCount={plan.intervalCount}
                  price={subscription.price}
                  isUsageBased={plan.isUsageBased ?? false}
                />

                <SubscriptionStatus
                  status={status}
                  statusFormatted={subscription.statusFormatted}
                  isPaused={Boolean(subscription.isPaused)}
                />

                <SubscriptionDate
                  endsAt={subscription.endsAt}
                  renewsAt={subscription.renewsAt}
                  status={status}
                  trialEndsAt={subscription.trialEndsAt}
                />
              </div>
            </Section.Item>
          )
        }
      )}
    </Section>
  )
}
