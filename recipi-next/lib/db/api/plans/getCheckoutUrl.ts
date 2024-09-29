'use server'

import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { configureLemonSqueezy } from '@/lib/lemonsqueezy'
import { getCurrentUser } from '@/lib/session'
import { plans } from '@/lib/db/schema-pg'
import { db } from '@/lib/db'
import { NewPlan } from '@/types'

export default async function getCheckoutURL(
  variantId: number,
  redirectUrl: string,
  embed = false
) {
  configureLemonSqueezy()

  const user = await getCurrentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        custom: {
          user_id: user.id,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
      },
    }
  )

  return checkout.data?.data.attributes.url
}
