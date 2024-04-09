'use server'

import { db } from '@/lib/db'
import { getRecipe } from '@/lib/db/api'
import { menus, users } from '@/lib/db/schema-pg'
import { MenuWithRecipes } from '@/types'
import { eq, desc } from 'drizzle-orm'

const getUserMenus = async (userId?: string): Promise<MenuWithRecipes[]> => {
  if (!userId) {
    return []
  }
  const menuList = await db
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
    .where(eq(menus.authorId, userId))
    .innerJoin(users, eq(menus.authorId, users.id))
    .orderBy(desc(menus.updatedAt))

  const result = []

  for (const menu of menuList) {
    const recipes = []
    if (!menu.recipes || menu.recipes?.length === 0) {
      result.push(menu)
      continue
    }
    for (const recipeId of menu.recipes) {
      const recipe = await getRecipe(recipeId)
      if (recipe) {
        recipes.push(recipe)
      }
    }
    result.push({
      ...menu,
      recipeInfo: recipes,
    })
  }

  return result
}

export default getUserMenus
