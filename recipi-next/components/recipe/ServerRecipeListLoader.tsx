import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerRecipeList } from './ServerRecipeList'
import { LoadingRecipeList } from './LoadingRecipeList'

interface ServerRecipeListLoaderProps {
  title?: string
  pagePath: string
  user?: User
  profileUserId?: string
  searchParams: { [key: string]: string | string[] | undefined }
  gridClassName?: string
}

export const ServerRecipeListLoader = async ({
  title,
  pagePath,
  user,
  profileUserId,
  searchParams,
  gridClassName,
}: ServerRecipeListLoaderProps) => {
  return (
    <Suspense fallback={LoadingRecipeList}>
      <ServerRecipeList
        title={title}
        pagePath={pagePath}
        user={user}
        profileUserId={profileUserId}
        searchParams={searchParams}
        gridClassName={gridClassName}
      />
    </Suspense>
  )
}
