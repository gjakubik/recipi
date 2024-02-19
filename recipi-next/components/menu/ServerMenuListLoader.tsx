import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerMenuList } from './ServerMenuList'
import { LoadingMenuList } from './LoadingMenuList'

interface ServerMenuListLoaderProps {
  pagePath: '/my-menus' | '/'
  user?: User
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerMenuListLoader = async ({
  pagePath,
  user,
  searchParams,
}: ServerMenuListLoaderProps) => {
  return (
    <Suspense fallback={LoadingMenuList}>
      <ServerMenuList
        pagePath={pagePath}
        user={user}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
