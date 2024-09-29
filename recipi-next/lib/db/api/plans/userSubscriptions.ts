'use server'

import {
  cancelSubscription,
  getSubscription,
  updateSubscription,
} from '@lemonsqueezy/lemonsqueezy.js'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { takeUniqueOrThrow } from '@/utils/lemonsqueezy'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { plans, subscriptions } from '@/lib/db/schema-pg'
import { NewSubscription } from '@/types'
import { configureLemonSqueezy } from '@/lib/lemonsqueezy'
import { getCurrentUser } from '@/lib/session'

/**
 * This action will get the subscriptions for the current user.
 */
export async function getUserSubscriptions() {
  const user = await getCurrentUser()
  const userId = user?.id

  if (!userId) {
    notFound()
  }

  const userSubscriptions: NewSubscription[] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))

  return userSubscriptions
}

/**
 * This action will get the subscription URLs (update_payment_method and
 * customer_portal) for the given subscription ID.
 *
 */
export async function getSubscriptionURLs(id: string) {
  configureLemonSqueezy()
  const subscription = await getSubscription(id)

  if (subscription.error) {
    throw new Error(subscription.error.message)
  }

  return subscription.data?.data.attributes.urls
}

/**
 * This action will cancel a subscription on Lemon Squeezy.
 */
export async function cancelSub(id: string) {
  configureLemonSqueezy()

  // Get user subscriptions
  const userSubscriptions = await getUserSubscriptions()

  // Check if the subscription exists
  const subscription = userSubscriptions.find(
    (sub) => sub.lemonSqueezyId === id
  )

  if (!subscription) {
    throw new Error(`Subscription #${id} not found.`)
  }

  const cancelledSub = await cancelSubscription(id)

  if (cancelledSub.error) {
    throw new Error(cancelledSub.error.message)
  }

  // Update the db
  try {
    await db
      .update(subscriptions)
      .set({
        status: cancelledSub.data?.data.attributes.status,
        statusFormatted: cancelledSub.data?.data.attributes.status_formatted,
        endsAt: cancelledSub.data?.data.attributes.ends_at,
      })
      .where(eq(subscriptions.lemonSqueezyId, id))
  } catch (error) {
    throw new Error(`Failed to cancel Subscription #${id} in the database.`)
  }

  revalidatePath('/')

  return cancelledSub
}

/**
 * This action will pause a subscription on Lemon Squeezy.
 */
export async function pauseUserSubscription(id: string) {
  configureLemonSqueezy()

  // Get user subscriptions
  const userSubscriptions = await getUserSubscriptions()

  // Check if the subscription exists
  const subscription = userSubscriptions.find(
    (sub) => sub.lemonSqueezyId === id
  )

  if (!subscription) {
    throw new Error(`Subscription #${id} not found.`)
  }

  const returnedSub = await updateSubscription(id, {
    pause: {
      mode: 'void',
    },
  })

  // Update the db
  try {
    await db
      .update(subscriptions)
      .set({
        status: returnedSub.data?.data.attributes.status,
        statusFormatted: returnedSub.data?.data.attributes.status_formatted,
        endsAt: returnedSub.data?.data.attributes.ends_at,
        isPaused: returnedSub.data?.data.attributes.pause !== null,
      })
      .where(eq(subscriptions.lemonSqueezyId, id))
  } catch (error) {
    throw new Error(`Failed to pause Subscription #${id} in the database.`)
  }

  revalidatePath('/')

  return returnedSub
}

/**
 * This action will unpause a subscription on Lemon Squeezy.
 */
export async function unpauseUserSubscription(id: string) {
  configureLemonSqueezy()

  // Get user subscriptions
  const userSubscriptions = await getUserSubscriptions()

  // Check if the subscription exists
  const subscription = userSubscriptions.find(
    (sub) => sub.lemonSqueezyId === id
  )

  if (!subscription) {
    throw new Error(`Subscription #${id} not found.`)
  }

  const returnedSub = await updateSubscription(id, {
    pause: null,
  })

  // Update the db
  try {
    await db
      .update(subscriptions)
      .set({
        status: returnedSub.data?.data.attributes.status,
        statusFormatted: returnedSub.data?.data.attributes.status_formatted,
        endsAt: returnedSub.data?.data.attributes.ends_at,
        isPaused: returnedSub.data?.data.attributes.pause !== null,
      })
      .where(eq(subscriptions.lemonSqueezyId, id))
  } catch (error) {
    throw new Error(`Failed to pause Subscription #${id} in the database.`)
  }

  revalidatePath('/')

  return returnedSub
}

/**
 * This action will change the plan of a subscription on Lemon Squeezy.
 */
export async function changePlan(currentPlanId: number, newPlanId: number) {
  configureLemonSqueezy()

  // Get user subscriptions
  const userSubscriptions = await getUserSubscriptions()

  // Check if the subscription exists
  const subscription = userSubscriptions.find(
    (sub) => sub.planId === currentPlanId
  )

  if (!subscription) {
    throw new Error(`No subscription with plan id #${currentPlanId} was found.`)
  }

  // Get the new plan details from the database.
  const newPlan = await db
    .select()
    .from(plans)
    .where(eq(plans.id, newPlanId))
    .then(takeUniqueOrThrow)

  // Send request to Lemon Squeezy to change the subscription.
  const updatedSub = await updateSubscription(subscription.lemonSqueezyId, {
    variantId: newPlan.variantId,
  })

  // Save in db
  try {
    await db
      .update(subscriptions)
      .set({
        planId: newPlanId,
        price: newPlan.price,
        endsAt: updatedSub.data?.data.attributes.ends_at,
      })
      .where(eq(subscriptions.lemonSqueezyId, subscription.lemonSqueezyId))
  } catch (error) {
    throw new Error(
      `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`
    )
  }

  revalidatePath('/')

  return updatedSub
}
