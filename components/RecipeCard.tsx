'use client'

import { useRef, useState, useLayoutEffect, useMemo } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Image from 'next/image'
import { Recipe } from '@/lib/types'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { IngredientsList } from './IngredientsList'
import { isZero, removeServings, timeValueToLabel } from '@/lib/utils'
import { Clock, MoreHorizontal, Users } from 'lucide-react'
import useSearch from '@/app/store/useSearch'

interface RecipeCardProps {
  recipe: Recipe
  cardKey: string | number
  onClick?: () => void
  isOwner?: boolean
  forceUpdate: number
  setForceUpdate: (value: number) => void
}

export const RecipeCard = ({
  recipe,
  cardKey,
  onClick,
  isOwner,
  forceUpdate,
  setForceUpdate,
}: RecipeCardProps) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { search } = useSearch()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showAllIngredients, setShowAllIngredients] = useState(false)

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      })
    }
  }, [forceUpdate, search])

  const visibleIngredients = useMemo(
    () =>
      showAllIngredients
        ? recipe.ingredients
        : recipe.ingredients.slice(0, dimensions.height / 21),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dimensions.height, recipe.ingredients, showAllIngredients, forceUpdate]
  )

  return (
    <Card
      key={cardKey}
      className="flex flex-col h-full shadow hover:shadow-xl hover:cursor-pointer dark:hover:bg-gray-900 transition-all duration-200 ease-in-out"
      onClick={() => !!onClick && onClick()}
    >
      <Link href={`/recipe/${recipe.id}`} className="grow flex flex-col">
        <CardHeader className="pb-2">
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
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 justify-between grow">
          <div className="grid grid-cols-[auto_auto_1fr] gap-1">
            {!isZero(recipe.preparationTime) && (
              <>
                <Clock className="w-3 h-3 mt-1" />
                <Typography variant="light">Prep Time</Typography>
                <Typography variant="extralight">
                  {timeValueToLabel(recipe.preparationTime || '')}
                </Typography>
              </>
            )}
            {!isZero(recipe.cookingTime) && (
              <>
                <Clock className="w-3 h-3 mt-1" />
                <Typography variant="light">Cook Time</Typography>
                <Typography variant="extralight">
                  {timeValueToLabel(recipe.cookingTime || '')}
                </Typography>
              </>
            )}
            {recipe.servings && (
              <>
                <Users className="w-3 h-3 mt-1" />
                <Typography variant="light">Servings</Typography>
                <Typography variant="extralight">
                  {removeServings(recipe.servings)} Servings
                </Typography>
              </>
            )}
          </div>
          <div className="grow flex flex-col justify-end">
            <div
              className={`grow ${
                showAllIngredients ? '' : 'min-h-[65px] overflow-clip'
              }`}
              ref={targetRef}
            >
              <IngredientsList
                ingredients={visibleIngredients}
                v3
                className="justify-end"
              />
            </div>
            {recipe.ingredients.length > visibleIngredients.length ? (
              <div className="ml-1">
                <Button
                  variant="smallAction"
                  size="xxs"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setForceUpdate(forceUpdate + 1)
                    setShowAllIngredients(true)
                  }}
                >
                  {recipe.ingredients.length - visibleIngredients.length}{' '}
                  more...
                </Button>
              </div>
            ) : (
              <div className="ml-1 h-6"></div>
            )}
          </div>
          <div>
            <Separator className="mb-4" />
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                {recipe.author.image && (
                  <Image
                    src={recipe.author.image}
                    alt={recipe.author.name!}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                )}
                <Typography variant="light">{recipe.author.name}</Typography>
              </div>
              <Typography variant="light">
                {recipe.creationDate
                  ? new Date(recipe.creationDate).toLocaleDateString()
                  : ''}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-row justify-end items-center gap-4">
        {isOwner && (
          <Button asChild size="sm" variant="outline">
            <Link href={`/recipe/${recipe.id}/edit`}>Edit Recipe</Link>
          </Button>
        )}
        <Button size="sm">Add to Menu</Button>
      </CardFooter>
    </Card>
  )
}
