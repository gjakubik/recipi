import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerRecipeList } from './ServerRecipeList'
import { LoadingRecipeList } from './LoadingRecipeList'

interface ServerRecipeListLoaderProps {
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerRecipeListLoader = async ({
  pagePath,
  user,
  profileUserId,
  searchParams,
}: ServerRecipeListLoaderProps) => {
  return (
    <Suspense fallback={LoadingRecipeList}>
      <ServerRecipeList
        pagePath={pagePath}
        user={user}
        profileUserId={profileUserId}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
