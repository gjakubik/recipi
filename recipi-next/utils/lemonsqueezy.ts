import { type Subscription } from '@lemonsqueezy/lemonsqueezy.js'

export function takeUniqueOrThrow<T extends unknown[]>(values: T): T[number] {
  if (values.length !== 1)
    throw new Error('Found non unique or inexistent value')
  return values[0]
}

export function isValidSubscription(
  status: Subscription['data']['attributes']['status']
) {
  return status !== 'cancelled' && status !== 'expired' && status !== 'unpaid'
}

export function formatDate(date: string | number | Date | null | undefined) {
  if (!date) return ''

  return new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatPrice(priceInCents: string) {
  const price = parseFloat(priceInCents)
  const dollars = price / 100

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // Use minimumFractionDigits to handle cases like $59.00 -> $59
    minimumFractionDigits: dollars % 1 !== 0 ? 2 : 0,
  }).format(dollars)
}
