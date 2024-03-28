'use server'

import { db } from '@/lib/db'
import { menus } from '@/lib/db/schema-pg'
import { eq, sql } from 'drizzle-orm'

interface GetUserMenus {
  userId: string
}

const getMenusQuery = db
  .select()
  .from(menus)
  .where(eq(menus.authorId, sql.placeholder('userId')))
  .prepare('getMenusQuery')

const getUserMenus = ({ userId }: GetUserMenus) => {
  return getMenusQuery.execute({ userId })
}

export default getUserMenus
