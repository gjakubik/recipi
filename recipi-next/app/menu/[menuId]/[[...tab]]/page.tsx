import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { getMenu } from '@/lib/db/api'
import { Typography } from '@/components/ui/typography'
import { UserAvatar } from '@/components/UserAvatar'
import { RecipeList } from '@/components/recipe/RecipeList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { GroceryList } from '@/components/menu/GroceryList'
import { redirect } from 'next/navigation'
import { RoutedMenuTabs } from './RoutedMenuTabs'

interface MenuDetailsPageProps {
  params: { menuId: string; tab?: string[] }
}

export default async function MenuDetailsPage({
  params: { menuId, tab },
}: MenuDetailsPageProps) {
  const user = await getCurrentUser()
  const menu = await getMenu(parseInt(menuId))

  if (!tab) {
    //redirect to recipes tab
    redirect(`/menu/${menuId}/recipes`)
  }

  const trueTab = tab[0]

  if (!menu) {
    return (
      <div>
        <Typography variant="h3">No Menu Found</Typography>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">{menu.title}</Typography>
      <Typography variant="pn">{menu.description}</Typography>
      <UserAvatar user={menu.author} />
      <RoutedMenuTabs user={user} menu={menu} />
    </div>
  )
}
