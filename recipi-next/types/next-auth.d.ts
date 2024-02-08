import { DefaultUser, User, DefaultSession } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: UserId
    role: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module '@auth/drizzle-adapter' {
  interface User extends DefaultUser {
    role: string
  }
}
