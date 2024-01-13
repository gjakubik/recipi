import * as React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { getMenus } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { UpsertMenuModal } from '@/components/modals/UpsertMenuModal'
import { ServerMenuList } from '@/components/menu/ServerMenuList'
import { MENU_QUERY } from '@/lib/constants'
import { Plus } from 'lucide-react'
import { ClientMenuList } from '@/components/menu/ClientMenuList'
import { MenuListController } from './MenuListController'

interface MyMenuPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const MyMenusPage = async ({ searchParams }: MyMenuPageProps) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const {
    page: pageParam,
    limit: limitParam,
    sort: sortParam,
    sortBy: sortByParam,
  } = searchParams

  const page =
    typeof pageParam === 'string' ? parseInt(pageParam) : MENU_QUERY.page
  const limit =
    typeof limitParam === 'string' ? parseInt(limitParam) : MENU_QUERY.limit
  const sort =
    typeof sortParam === 'string'
      ? (sortParam as 'asc' | 'desc')
      : MENU_QUERY.sort
  const sortBy =
    typeof sortByParam === 'string'
      ? (sortByParam as 'title' | 'creationDate' | 'updatedAt')
      : MENU_QUERY.sortBy

  const initialData = await getMenus({
    authorId: user.id,
    page,
    limit,
    sort,
    sortBy,
  })

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h3" className="mb-4">
          My Menus
        </Typography>
        <UpsertMenuModal user={user}>
          <Button className="flex flex-row gap-2">
            <Plus width={16} /> Menu
          </Button>
        </UpsertMenuModal>
      </div>
      <div className="flex flex-col gap-4">
        {/* <UpsertMenuModal user={user}>
          <Button>Create Menu</Button>
        </UpsertMenuModal> */}
        <MenuListController initialData={initialData} user={user} />
      </div>
    </>
  )
}

export default MyMenusPage
