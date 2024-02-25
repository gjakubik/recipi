import * as React from 'react'
import { getCurrentUser } from '@/lib/session'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'
import { ServerMenuListLoader } from '@/components/menu/ServerMenuListLoader'

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const user = await getCurrentUser()
  return (
    <div className="flex flex-col gap-8">
      <ServerRecipeListLoader
        title="New Recipes"
        pagePath="/"
        user={user}
        searchParams={searchParams}
      />
      <ServerMenuListLoader
        title="New Menus"
        pagePath="/"
        user={user}
        searchParams={searchParams}
      />
    </div>
  )
}

export default HomePage
