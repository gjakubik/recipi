import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerMenuList } from './ServerMenuList'
import { LoadingMenuList } from './LoadingMenuList'

interface ServerMenuListLoaderProps {
  title?: string
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerMenuListLoader = async ({
  title,
  pagePath,
  user,
  profileUserId,
  searchParams,
}: ServerMenuListLoaderProps) => {
  return (
    <Suspense fallback={LoadingMenuList}>
      <ServerMenuList
        title={title}
        pagePath={pagePath}
        user={user}
        profileUserId={profileUserId}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
