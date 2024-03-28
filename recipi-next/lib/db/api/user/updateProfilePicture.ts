'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema-pg'
import getUser from './getUser'
import { eq } from 'drizzle-orm'

const updateProfilePicture = async (userId: string, image: string) => {
  const updatedUser = await db
    .update(users)
    .set({ image })
    .where(eq(users.id, userId))
    .returning({ id: users.id })
    .execute()

  if (!updatedUser) {
    throw new Error('Failed to update user')
  }

  return updatedUser
}

export default updateProfilePicture
