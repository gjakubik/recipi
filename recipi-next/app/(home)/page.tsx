import * as React from 'react'
import { Search } from '@/components/Search'
import { LoadingCards } from './LoadingCards'
import { RecipeListLoader } from './RecipeListLoader'

const HomePage = async () => {
  return (
    <>
      <div className="flex sm:hidden w-full pb-6">
        <Search className="w-full" />
      </div>
      <React.Suspense fallback={LoadingCards}>
        <RecipeListLoader />
      </React.Suspense>
    </>
  )
}

export default HomePage
