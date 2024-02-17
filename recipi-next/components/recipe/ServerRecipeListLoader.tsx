import { User } from 'next-auth'
import { Suspense } from 'react'

import { ServerRecipeList } from './ServerRecipeList'
import { LoadingRecipeList } from './LoadingRecipeList'

interface ServerRecipeListLoaderProps {
  pagePath: '/my-recipes' | '/'
  user?: User
  searchParams: { [key: string]: string | string[] | undefined }
}

export const ServerRecipeListLoader = async ({
  pagePath,
  user,
  searchParams,
}: ServerRecipeListLoaderProps) => {
  return (
    <Suspense fallback={LoadingRecipeList}>
      <ServerRecipeList
        pagePath={pagePath}
        user={user}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
