'use server'

import { db } from '@/lib/db'
import { menus } from '@/lib/db/schema-pg'
import { InsertMenu } from '@/types'

const createMenu = async (menu: InsertMenu) => {
  const [newMenu] = await db
    .insert(menus)
    .values({
      title: menu.title,
      description: menu.description,
      recipes: menu.recipes,
      authorId: menu.authorId,
    })
    .returning()

  if (!newMenu) {
    throw new Error('Failed to create menu')
  }

  return newMenu
}

export default createMenu
