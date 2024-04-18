'use client'

import { useState } from 'react'
import { Recipe, GetMenusResult, MenuWithRecipes } from '@/types'
import useSearch from '@/app/store/useSearch'

import { RecipeCard } from '@/components/recipe/RecipeCard'

interface RecipeListProps {
  recipes: Recipe[]
  menus: MenuWithRecipes[]
}

export function RecipeList({ menus, recipes }: RecipeListProps) {
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
          menus={menus}
          forceUpdate={forceUpdate}
          setForceUpdate={setForceUpdate}
        />
      ))}
    </>
  )
}
