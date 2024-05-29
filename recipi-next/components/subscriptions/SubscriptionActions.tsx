import { getSubscriptionURLs } from '@/lib/db/api'
import { type NewSubscription } from '@/types/schema'
import { SubscriptionActionsDropdown } from './SubscriptionActionsDropdown'

export async function SubscriptionActions({
  subscription,
}: {
  subscription: NewSubscription
}) {
  if (
    subscription.status === 'expired' ||
    subscription.status === 'cancelled' ||
    subscription.status === 'unpaid'
  ) {
    return null
  }

  const urls = await getSubscriptionURLs(subscription.lemonSqueezyId)

  return <SubscriptionActionsDropdown subscription={subscription} urls={urls} />
}
