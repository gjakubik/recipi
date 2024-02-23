import * as React from 'react'
import { redirect } from 'next/navigation'
import { Typography } from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/session'
import { ServerRecipeListLoader } from '@/components/recipe/ServerRecipeListLoader'

interface MyRecipesServerPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const MyRecipesServerPage = async ({
  searchParams,
}: MyRecipesServerPageProps) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <Typography variant="h2" className="mb-4">
        My Recipes
      </Typography>
      <ServerRecipeListLoader
        pagePath="/my-recipes"
        user={user}
        searchParams={searchParams}
      />
    </>
  )
}

export default MyRecipesServerPage
