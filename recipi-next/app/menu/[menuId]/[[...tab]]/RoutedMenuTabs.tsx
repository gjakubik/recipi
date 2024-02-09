'use client'

import { MenuWithRecipes } from '@/types'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

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
  //Get current tab by looking at end of url
  const router = useRouter()
  const pathname = usePathname()
  const { canSeeGroceryList } = useFeatureFlags()

  const tab = pathname.split('/').pop()

  const updateTab = (newTab: string) => {
    if (newTab === tab) return
    router.replace(`/menu/${menu.id}/${newTab}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Typography
          variant="pn"
          className="px-4 pb-3 dashed-border-hover hover:cursor-default"
          onClick={() => updateTab('recipes')}
        >
          Recipes
        </Typography>
        {canSeeGroceryList && (
          <Typography
            variant="pn"
            className="px-4 pb-3 dashed-border-hover hover:cursor-default"
            onClick={() => updateTab('grocery-list')}
          >
            Grocery List
          </Typography>
        )}
      </div>
      {tab === 'recipes' && (
        <div>
          {menu.recipeInfo?.length === 0 ? (
            <div className="h-32 flex flex-col gap-2 items-center justify-center">
              <Typography>No Recipes Here. Add some!</Typography>
              <div>
                {!!user ? (
                  <Button asChild>
                    <Link href="/create">
                      <Plus width={16} /> Recipe
                    </Link>
                  </Button>
                ) : (
                  <Button>Log in</Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-x-4 md:gap-x-8">
              <RecipeList
                user={user}
                // @ts-ignore
                recipes={menu.recipeInfo.filter((r) => !!r)}
              />
            </div>
          )}
        </div>
      )}
      {tab === 'grocery-list' && canSeeGroceryList && (
        <GroceryList menu={menu} />
      )}
    </div>
  )
}
