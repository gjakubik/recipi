'use client'

import { Recipe } from '@/lib/types'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { timeValueToLabel } from '@/lib/utils'

interface RecipeCardProps {
  recipe: Recipe
  onClick?: () => void
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card
      className="shadow hover:shadow-xl hover:cursor-pointer dark:hover:bg-gray-900 transition-all duration-200 ease-in-out"
      onClick={() => !!onClick && onClick()}
    >
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-center justify-center gap-0">
            <Typography variant="light">Prep Time</Typography>
            <Typography variant="extralight">
              {timeValueToLabel(recipe.preparationTime || '')}
            </Typography>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center justify-center gap-0">
            <Typography variant="light">Cook Time</Typography>
            <Typography variant="extralight">
              {timeValueToLabel(recipe.cookingTime || '')}
            </Typography>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center justify-center gap-0">
            <Typography variant="light">Amount</Typography>
            <Typography variant="extralight">
              {recipe.servings} Servings
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecipeCard
