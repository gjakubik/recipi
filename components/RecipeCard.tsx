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
import { isZero, removeServings, timeValueToLabel } from '@/lib/utils'
import { Clock, Users } from 'lucide-react'

interface RecipeCardProps {
  recipe: Recipe
  key: string | number
  onClick?: () => void
}

export const RecipeCard = ({ recipe, key, onClick }: RecipeCardProps) => {
  return (
    <Link href={`/recipe/${recipe.id}`} key={key}>
      <Card
        className="h-full shadow hover:shadow-xl hover:cursor-pointer dark:hover:bg-gray-900 transition-all duration-200 ease-in-out"
        onClick={() => !!onClick && onClick()}
      >
        <CardHeader>
          <CardTitle className="text-xl">{recipe.title}</CardTitle>
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
        <CardContent className="flex flex-col gap-2 justify-between">
          <CardDescription className="h-[44px] line-clamp-2">
            {recipe.description}
          </CardDescription>
          <div className="grid grid-cols-[auto_auto_1fr] gap-2">
            {!isZero(recipe.preparationTime) && (
              <>
                <Clock className="w-5 h-5" />
                <Typography variant="light">Prep Time</Typography>
                <Typography variant="extralight">
                  {timeValueToLabel(recipe.preparationTime || '')}
                </Typography>
              </>
            )}
            {!isZero(recipe.cookingTime) && (
              <>
                <Clock className="w-5 h-5" />
                <Typography variant="light">Cook Time</Typography>
                <Typography variant="extralight">
                  {timeValueToLabel(recipe.cookingTime || '')}
                </Typography>
              </>
            )}
            {recipe.servings && (
              <>
                <Users className="w-5 h-5" />
                <Typography variant="light">Servings</Typography>
                <Typography variant="extralight">
                  {removeServings(recipe.servings)} Servings
                </Typography>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
