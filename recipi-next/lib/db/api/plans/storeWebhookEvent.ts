'use server'

import crypto from 'node:crypto'
import { db } from '@/lib/db'
import { plans, webhookEvents } from '@/lib/db/schema-pg'
import { NewWebhookEvent } from '@/types'

export default async function storeWebhookEvent(
  eventName: string,
  body: NewWebhookEvent['body']
) {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not set')
  }

  const id = crypto.randomInt(100000000, 1000000000)

  const returnedValue = await db
    .insert(webhookEvents)
    .values({
      id,
      eventName,
      processed: false,
      body,
    })
    .onConflictDoNothing({ target: plans.id })
    .returning()

  return returnedValue[0]
}
