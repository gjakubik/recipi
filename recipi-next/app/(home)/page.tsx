import * as React from 'react'
import { RecipeListLoader } from '@/components/recipe/RecipeListLoader'
import { LoadingRecipeList } from '@/components/recipe/LoadingRecipeList'

const HomePage = async () => (
  <React.Suspense fallback={LoadingRecipeList}>
    <RecipeListLoader />
  </React.Suspense>
)

export default HomePage
