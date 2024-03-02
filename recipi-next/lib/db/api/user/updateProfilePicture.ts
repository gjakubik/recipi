'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import getUser from './getUser'
import { eq } from 'drizzle-orm'

const updateProfilePicture = async (userId: string, image: string) => {
  await db.update(users).set({ image }).where(eq(users.id, userId))

  const updatedUser = await getUser(userId)

  if (!updatedUser) {
    throw new Error('Failed to update user')
  }

  return updatedUser
}

export default updateProfilePicture
