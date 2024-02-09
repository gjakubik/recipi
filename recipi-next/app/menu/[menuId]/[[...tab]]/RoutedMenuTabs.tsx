'use client'
import React from 'react'
import { RoutedTabs, Tab } from '@/components/RoutedTabs' // Ensure this path matches where you saved the RoutedTabs component
import { MenuWithRecipes } from '@/types'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { GroceryList } from '@/components/menu/GroceryList'
import { RecipeList } from '@/components/recipe/RecipeList'
import { Plus } from 'lucide-react'
import { User } from 'next-auth'
import { useFeatureFlags } from '@/hooks/use-feature-flags'

interface RoutedMenuTabsProps {
  user?: User
  menu: MenuWithRecipes
}

export const RoutedMenuTabs = ({ user, menu }: RoutedMenuTabsProps) => {
  const { canSeeGroceryList } = useFeatureFlags()

  return (
    <RoutedTabs basePath={`/menu/${menu.id}`}>
      <Tab label="Recipes" route={`recipes`}>
        {menu.recipeInfo?.length === 0 ? (
          <div className="h-32 flex flex-col gap-2 items-center justify-center">
            <Typography>No Recipes Here. Add some!</Typography>
            <div>
              {user ? (
                <Button asChild>
                  <Link href="/create">
                    <a>
                      <Plus width={16} /> Recipe
                    </a>
                  </Link>
                </Button>
              ) : (
                <Button>Log in</Button>
              )}
            </div>
          </div>
        ) : (
          <RecipeList
            user={user}
            // @ts-ignore
            recipes={menu?.recipeInfo?.filter((r) => !!r)}
          />
        )}
      </Tab>
      {canSeeGroceryList && (
        <Tab label="Grocery List" route={`grocery-list`}>
          <GroceryList menu={menu} />
        </Tab>
      )}
    </RoutedTabs>
  )
}
