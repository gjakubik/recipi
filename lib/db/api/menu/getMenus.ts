'use server'

import { db } from '@/lib/db'
import { menus, users } from '@/lib/db/schema'
import { getRecipe } from '@/lib/db/api/'
import { Menu, MenuWithRecipes } from '@/types'
import { eq, sql, ilike, or, and, asc, desc } from 'drizzle-orm'

interface GetMenus {
  search?: string
  authorId?: string
  sortBy?: 'title' | 'creationDate' | 'updatedAt'
  sort?: 'asc' | 'desc'
  limit?: number
  page?: number
}

type GetMenusResult = {
  menus: MenuWithRecipes[]
  count: number
}

const getMenus = async ({
  search,
  authorId,
  sortBy,
  sort,
  limit = 10,
  page = 0,
}: GetMenus): Promise<GetMenusResult> => {
  return await db.transaction(async (tx) => {
    const menuList = await tx
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
          updated_at: users.updated_at,
          created_at: users.created_at,
          emailVerified: users.emailVerified,
        },
        creationDate: menus.creationDate,
        updatedAt: menus.updatedAt,
      })
      .from(menus)
      .limit(limit)
      .offset(page * limit)
      .where(
        and(
          or(
            search ? ilike(menus.title, `%${search}%`) : undefined,
            search ? ilike(menus.description, `%${search}%`) : undefined
          ),
          authorId ? eq(menus.authorId, authorId) : undefined
        )
      )
      .innerJoin(users, eq(menus.authorId, users.id))
      .orderBy(
        sortBy && sortBy in menus
          ? sort === 'asc'
            ? asc(menus[sortBy])
            : desc(menus[sortBy])
          : desc(menus.updatedAt)
      )

    const result = []
    // Get recipes for each menu
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

    // Get total count
    const countQuery = await tx
      .select({
        count: sql<number>`count(${menus.id})`,
      })
      .from(menus)
      .where(
        and(
          or(
            search ? ilike(menus.title, `%${search}%`) : undefined,
            search ? ilike(menus.description, `%${search}%`) : undefined
          ),
          authorId ? eq(menus.authorId, authorId) : undefined
        )
      )

    const count = countQuery[0].count

    return {
      menus: result,
      count,
    }
  })
}

export default getMenus
