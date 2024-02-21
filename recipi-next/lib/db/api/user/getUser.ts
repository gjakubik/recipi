import { db } from '@/lib/db'
import { User } from '@/types'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const getUser = async (userId: string): Promise<User | undefined> => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!user[0]) {
      throw new Error('User not found')
    }

    return user[0]
  } catch (error) {
    console.log(error)
    return
  }
}

export default getUser
