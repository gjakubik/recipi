import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { getMenu } from '@/lib/db/api'
import { Typography } from '@/components/ui/typography'
import { UserAvatar } from '@/components/UserAvatar'
import { RecipeList } from '@/components/recipe/RecipeList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface MenuDetailsPageProps {
  params: { menuId: string }
}

export default async function MenuDetailsPage({
  params: { menuId },
}: MenuDetailsPageProps) {
  const user = await getCurrentUser()
  const menu = await getMenu(parseInt(menuId))

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
      <Typography variant="h3">Recipes</Typography>
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
  )
}
