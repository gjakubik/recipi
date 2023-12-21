'use client'

import { useState } from 'react'
import { Recipe } from '@/lib/types'
import { RecipeCard } from './RecipeCard'
import useSearch from '@/app/store/useSearch'

interface RecipeListProps {
  recipes: Recipe[]
  userId?: string
}

export function RecipeList({ recipes, userId }: RecipeListProps) {
  const { search } = useSearch()
  const [forceUpdate, setForceUpdate] = useState(0)

  const filteredRecipes = recipes.filter((recipe) => {
    if (search.length < 2) return true
    const inTitle = recipe.title.toLowerCase().includes(search.toLowerCase())
    const inDescription = recipe.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
    const inInstructions = recipe.instructions?.some((instruction) =>
      instruction.toLowerCase().includes(search.toLowerCase())
    )
    return inTitle || inDescription || inInstructions
  })

  return (
    <>
      {filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          cardKey={recipe.id}
          recipe={recipe}
          isOwner={userId === recipe.authorId}
          forceUpdate={forceUpdate}
          setForceUpdate={setForceUpdate}
        />
      ))}
    </>
  )
}
