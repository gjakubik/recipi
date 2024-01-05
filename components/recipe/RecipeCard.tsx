'use client'

import { useState, useMemo } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, MenuWithRecipes, Recipe } from '@/types'
import { useResizableRef } from '@/hooks/use-resizable-observer'
import useSearch from '@/app/store/useSearch'
import {
  getInitials,
  isZero,
  removeServings,
  timeValueToLabel,
} from '@/lib/utils'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { IngredientsList } from '@/components/recipe/IngredientsList'
import { Clock, Users } from 'lucide-react'
import { AddRecipeToMenusModal } from '../modals/AddRecipeToMenusModal'
import { UserAvatar } from '../UserAvatar'
import { RecipePreviewCard } from './RecipePreviewCard'
import { User } from 'next-auth'

interface RecipeCardProps {
  recipe: Recipe
  menus?: MenuWithRecipes[]
  cardKey: string | number
  onClick?: () => void
  user?: User
  forceUpdate: number
  setForceUpdate: (value: number) => void
}

export const RecipeCard = ({
  recipe,
  menus,
  cardKey,
  onClick,
  user,
  forceUpdate,
  setForceUpdate,
}: RecipeCardProps) => {
  const { search } = useSearch()
  const [showAllIngredients, setShowAllIngredients] = useState(false)

  const { targetRef, dimensions } = useResizableRef()

  const visibleIngredients = useMemo(
    () =>
      showAllIngredients
        ? recipe.ingredients
        : recipe.ingredients.slice(0, dimensions.height / 20),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dimensions.height, recipe.ingredients, showAllIngredients, forceUpdate]
  )

  const loggedIn = !!user
  const isOwner = user?.id === recipe.authorId

  return (
    <Card
      key={cardKey}
      className="flex flex-col h-full shadow hover:shadow-xl hover:cursor-pointer dark:hover:bg-gray-900 transition-all duration-200 ease-in-out"
      onClick={() => onClick?.()}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/recipe/${recipe.id}`} className="grow flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>
                <Typography className="text-xl border-b long-dashed-border">
                  {recipe.title}
                </Typography>
              </CardTitle>
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
              <div className="flex flex-col gap-1">
                {!isZero(recipe.preparationTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className="w-3 h-3 mt-1" />
                    <Typography variant="light">Prep</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.preparationTime || '')}
                    </Typography>
                  </div>
                )}
                {!isZero(recipe.cookingTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className="w-3 h-3 mt-1" />
                    <Typography variant="light">Cook</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.cookingTime || '')}
                    </Typography>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex flex-row gap-1">
                    <Users className="w-3 h-3 mt-1" />
                    <Typography variant="light">Servings</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {removeServings(recipe.servings)}
                    </Typography>
                  </div>
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
                  <div className="ml-1 h-7"></div>
                )}
              </div>
              <div>
                <Separator className="mb-4" />
                <div className="flex flex-row justify-between items-center">
                  <UserAvatar user={recipe.author} />
                  <Typography variant="light">
                    {recipe.creationDate
                      ? new Date(recipe.creationDate).toLocaleDateString()
                      : ''}
                  </Typography>
                </div>
                {/* <RecipePreviewCard recipe={recipe} /> */}
              </div>
            </CardContent>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <Typography>Go to {recipe.title}</Typography>
        </TooltipContent>
      </Tooltip>
      <CardFooter className="flex flex-row justify-end items-center gap-4">
        {isOwner && (
          <Button asChild size="sm" variant="outline">
            <Link href={`/recipe/${recipe.id}/edit`}>Edit Recipe</Link>
          </Button>
        )}
        {loggedIn && (
          <AddRecipeToMenusModal user={user} recipe={recipe} menus={menus}>
            <Button size="sm">Add to Menu</Button>
          </AddRecipeToMenusModal>
        )}
      </CardFooter>
    </Card>
  )
}
