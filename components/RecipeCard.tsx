'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/lib/types'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { timeValueToLabel } from '@/lib/utils'

interface RecipeCardProps {
  recipe: Recipe
  key: string | number
  onClick?: () => void
}

const RecipeCard = ({ recipe, key, onClick }: RecipeCardProps) => {
  return (
    <Link href={`/recipe/${recipe.id}`} key={key}>
      <Card
        className="h-full shadow hover:shadow-xl hover:cursor-pointer dark:hover:bg-gray-900 transition-all duration-200 ease-in-out"
        onClick={() => !!onClick && onClick()}
      >
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          {recipe.titleImage && (
            <AspectRatio ratio={16 / 9}>
              <Image
                src={recipe.titleImage.url}
                alt={recipe.title}
                fill
                className="rounded-md object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </AspectRatio>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-2 justify-center">
          <CardDescription className="h-[44px] line-clamp-2">
            {recipe.description}
          </CardDescription>
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
    </Link>
  )
}

export default RecipeCard
