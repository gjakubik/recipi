import React from 'react'

import { Typography } from '@/components/ui/typography'
import { MainNav } from '@/components/MainNav'

const RecipePage = () => {
  return (
    <>
      <MainNav />
      <div>
        <Typography variant="h2">My Recipes</Typography>
      </div>
    </>
  )
}

export default RecipePage
