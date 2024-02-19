import * as React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { UpsertMenuModal } from '@/components/modals/UpsertMenuModal'
import { ServerMenuListLoader } from '@/components/menu/ServerMenuListLoader'
import { Plus } from 'lucide-react'

interface MyMenuPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const MyMenusPage = async ({ searchParams }: MyMenuPageProps) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b">
        <Typography variant="h2" className="border-b-transparent">
          My Menus
        </Typography>
        <UpsertMenuModal user={user}>
          <Button className="flex flex-row gap-2">
            <Plus width={16} /> Menu
          </Button>
        </UpsertMenuModal>
      </div>
      <div className="flex flex-col gap-4">
        <ServerMenuListLoader
          pagePath="/my-menus"
          searchParams={searchParams}
          user={user}
        />
      </div>
    </>
  )
}

export default MyMenusPage
