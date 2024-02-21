import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerMenuList } from './ServerMenuList'
import { LoadingMenuList } from './LoadingMenuList'

interface ServerMenuListLoaderProps {
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerMenuListLoader = async ({
  pagePath,
  user,
  profileUserId,
  searchParams,
}: ServerMenuListLoaderProps) => {
  return (
    <Suspense fallback={LoadingMenuList}>
      <ServerMenuList
        pagePath={pagePath}
        user={user}
        profileUserId={profileUserId}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
