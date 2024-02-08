'use server'

import { db } from '@/lib/db'
import { menus } from '@/lib/db/schema'
import { InsertMenu } from '@/types'
import getMenu from './getMenu'

const createMenu = async (menu: InsertMenu) => {
  const newMenuExec = await db.insert(menus).values({
    title: menu.title,
    description: menu.description,
    recipes: menu.recipes,
    authorId: menu.authorId,
  })
  // Get newly created menu
  const newMenu = await getMenu(parseInt(newMenuExec.insertId))

  if (!newMenu) {
    throw new Error('Failed to create menu')
  }

  return newMenu
}

export default createMenu
