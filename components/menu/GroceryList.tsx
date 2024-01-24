import { MenuWithRecipes } from '@/types'
import { getIngredientsFromMenu } from '@/utils/groceryUtils'

import { IngredientsList } from '@/components/recipe/IngredientsList'
import { useMemo } from 'react'

interface GroceryListProps {
  menu: MenuWithRecipes
}

export const GroceryList = ({ menu }: GroceryListProps) => {
  const ingredients = useMemo(() => getIngredientsFromMenu(menu), [menu])
  return (
    <div>
      <IngredientsList ingredients={ingredients} v2 />
    </div>
  )
}
