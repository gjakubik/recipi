'use server'

import { db } from '@/lib/db'
import { plans } from '@/lib/db/schema-pg'

const deletePlans = async () => {
  await db.delete(plans).execute()
}

export default deletePlans
