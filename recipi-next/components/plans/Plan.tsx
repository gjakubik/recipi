import { NewPlan } from '@/types'
import { Alert } from '@lemonsqueezy/wedges'

import { Typography } from '@/components/ui/typography'
import { SubscriptionSignupButton } from './SubscriptionSignupButton'
import { SearchXIcon } from 'lucide-react'

export function Plan({
  plan,
  currentPlan,
  isChangingPlans = false,
}: {
  plan: NewPlan
  currentPlan?: NewPlan
  isChangingPlans?: boolean
}) {
  const { description, id, productName, name, price } = plan
  const isCurrent = id && currentPlan?.id === id
  console.log(plan)
  return (
    <div className="flex h-full flex-col items-center justify-between rounded-xl border-2 border-dashed p-4">
      <div className="flex h-full flex-col gap-4">
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h2xb">
          ${price.slice(0, -2) + '.' + price.slice(-2)}
        </Typography>
        {description ? (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              // Ideally sanitize the description first.
              __html: description,
            }}
          />
        ) : null}
      </div>
      <SubscriptionSignupButton className="w-3/5" plan={plan} />
    </div>
  )
}

export function NoPlans() {
  return (
    <section className="prose mt-[10vw] flex flex-col items-center justify-center">
      <span className="size-24 bg-wg-red-50/70 flex items-center justify-center rounded-full">
        <SearchXIcon
          className="text-wg-red"
          aria-hidden="true"
          size={48}
          strokeWidth={0.75}
        />
      </span>

      <p className="text-balance max-w-prose text-center leading-6 text-gray-500">
        There are no plans available at the moment.
      </p>
    </section>
  )
}

export function InfoMessage() {
  return (
    <Alert className="not-prose mt-2">
      Follow{' '}
      <a
        href="https://docs.lemonsqueezy.com/guides/developer-guide/testing-going-live#testing-the-checkout"
        target="_blank"
        className="text-gray-900 underline hover:text-primary"
      >
        these instructions
      </a>{' '}
      on how to do test payments with Lemon Squeezy.
    </Alert>
  )
}
