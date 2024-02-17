import * as React from 'react'
import { Search } from '@/components/Search'
import { getCurrentUser } from '@/lib/session'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const user = await getCurrentUser()
  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <ServerRecipeListLoader
        pagePath="/"
        user={user}
        searchParams={searchParams}
      />
    </>
  )
}

export default HomePage
