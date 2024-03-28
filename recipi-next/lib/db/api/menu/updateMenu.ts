'use server'

import { db } from '@/lib/db'
import { menus } from '@/lib/db/schema-pg'
import { eq } from 'drizzle-orm'
import getMenu from './getMenu'
import { MenuFormValues } from '@/lib/validations/menu'
import { MenuWithRecipes } from '@/types'

const updateMenu = async (menu: MenuFormValues | MenuWithRecipes) => {
  if (!menu.id) {
    throw new Error('Menu id is required')
  }

  const [updatedMenu] = await db
    .update(menus)
    .set({
      title: menu.title,
      description: menu.description,
      recipes: menu.recipes,
      authorId: menu.authorId,
    })
    .where(eq(menus.id, menu.id))
    .returning()

  if (!updatedMenu) {
    throw new Error('Failed to update menu')
  }

  return updatedMenu
}

export default updateMenu
