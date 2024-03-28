'use server'

import { db } from '@/lib/db'
import { menus, users } from '@/lib/db/schema-pg'
import { eq, sql } from 'drizzle-orm'
import { getRecipe } from '@/lib/db/api'

const getMenuQuery = db
  .select({
    id: menus.id,
    title: menus.title,
    description: menus.description,
    recipes: menus.recipes,
    authorId: menus.authorId,
    author: {
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      role: users.role,
      updatedAt: users.updatedAt,
      createdAt: users.createdAt,
      emailVerified: users.emailVerified,
    },
    creationDate: menus.creationDate,
    updatedAt: menus.updatedAt,
  })
  .from(menus)
  .where(eq(menus.id, sql.placeholder('menuId')))
  .innerJoin(users, eq(menus.authorId, users.id))
  .prepare('getMenuQuery')

const getMenu = async (menuId: number) => {
  const [menu] = await getMenuQuery.execute({ menuId })

  if (!menu) {
    throw new Error('Menu not found')
  }

  const recipeInfo = []
  if (menu.recipes && menu.recipes.length > 0) {
    for (const recipeId of menu.recipes) {
      const recipe = await getRecipe(recipeId)
      recipeInfo.push(recipe)
    }
  }

  return {
    ...menu,
    recipeInfo,
  }
}

export default getMenu
