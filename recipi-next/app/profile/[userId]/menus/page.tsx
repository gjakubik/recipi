import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { ServerMenuListLoader } from '@/components/menu/ServerMenuListLoader'

interface ProfileMenuTabProps {
  params: { userId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProfileRecipesTab({
  params: { userId },
  searchParams,
}: ProfileMenuTabProps) {
  const user = await getCurrentUser()

  return (
    <>
      <ServerMenuListLoader
        pagePath={`/profile/${userId}/recipes`}
        user={user}
        profileUserId={userId}
        searchParams={searchParams}
      />
    </>
  )
}
