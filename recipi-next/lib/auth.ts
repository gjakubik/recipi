import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from './db'
import { users } from './db/schema'
import { eq } from 'drizzle-orm'

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ts-ignore
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id || ''))
        .limit(1)

      if (session.user) {
        session.user.id = user.id
        session.user.name = user.name
        session.user.email = user.email
        session.user.image = user.image
        session.user.role = dbUser.role || 'basic'
      }

      return session
    },
  },
}
