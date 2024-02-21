import { Typography } from '@/components/ui/typography'
import { LoadingMenuList } from '@/components/menu/LoadingMenuList'

export default function LoadingMyMenus() {
  return (
    <>
      <Typography variant="h2">My Menus</Typography>
      <div className="mt-4">{LoadingMenuList}</div>
    </>
  )
}
