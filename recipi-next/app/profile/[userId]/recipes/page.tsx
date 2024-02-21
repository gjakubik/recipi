import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'

interface ProfileRecipesTabProps {
  params: { userId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProfileRecipesTab({
  params: { userId },
  searchParams,
}: ProfileRecipesTabProps) {
  const user = await getCurrentUser()

  return (
    <>
      <ServerRecipeListLoader
        pagePath={`/profile/${userId}/recipes`}
        user={user}
        profileUserId={userId}
        searchParams={searchParams}
      />
    </>
  )
}
