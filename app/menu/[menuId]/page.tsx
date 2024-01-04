import { getMenu } from '@/lib/db/api'
import { Typography } from '@/components/ui/typography'
import { UserAvatar } from '@/components/UserAvatar'
import { RecipeList } from '@/components/recipe/RecipeList'

interface MenuDetailsPageProps {
  params: { menuId: string }
}

export default async function MenuDetailsPage({
  params: { menuId },
}: MenuDetailsPageProps) {
  const menu = await getMenu(parseInt(menuId))

  if (!menu) {
    return (
      <div>
        <Typography variant="h3">No Menu Found</Typography>
      </div>
    )
  }
  console.log(menu)
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">{menu.title}</Typography>
      <Typography variant="pn">{menu.description}</Typography>
      <UserAvatar user={menu.author} />
      {menu.recipeInfo?.length === 0 ? (
        <Typography>No Menus Here. Add some!</Typography>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-x-4 md:gap-x-8">
          {/* @ts-ignore */}
          <RecipeList recipes={menu.recipeInfo.filter((r) => !!r)} />
        </div>
      )}
    </div>
  )
}
