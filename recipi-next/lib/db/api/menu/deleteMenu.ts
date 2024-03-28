'use server'

import { db } from '@/lib/db'
import { menus } from '@/lib/db/schema-pg'
import { eq, sql } from 'drizzle-orm'

interface DeleteMenu {
  menuId: string
}

const deleteMenuQuery = db
  .delete(menus)
  .where(eq(menus.id, sql.placeholder('menuId')))
  .prepare('deleteMenuQuery')

const deleteMenu = async ({ menuId }: DeleteMenu) => {
  await deleteMenuQuery.execute({ menuId })
}

export default deleteMenu
