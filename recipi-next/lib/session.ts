import { getServerSession } from 'next-auth/next'
import { db } from '@/lib/db'
import { sessions, users } from '@/lib/db/schema-pg'
import { authOptions } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export async function getSessionToken(userId: string) {
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId))
    .limit(1)
  console.log(session)
  return session?.sessionToken
}
