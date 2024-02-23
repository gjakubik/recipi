import * as React from 'react'
import { getCurrentUser } from '@/lib/session'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const user = await getCurrentUser()
  return (
    <>
      <ServerRecipeListLoader
        pagePath="/"
        user={user}
        searchParams={searchParams}
      />
    </>
  )
}

export default HomePage
