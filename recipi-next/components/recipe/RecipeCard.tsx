'use client'

import { useState, useMemo } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Image from 'next/image'
import { GetMenusResult, Recipe } from '@/types'
import { useResizableRef } from '@/hooks/use-resizable-observer'
import useSearch from '@/app/store/useSearch'
import { isZero, removeServings, timeValueToLabel } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'

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
import { AddRecipeToMenusModal } from '@/components/modals/AddRecipeToMenusModal'
import { UserAvatar } from '@/components/UserAvatar'
import { User } from 'next-auth'

interface RecipeCardProps {
  recipe: Recipe
  initialMenus?: GetMenusResult
  cardKey: string | number
  onClick?: () => void
  forceUpdate: number
  setForceUpdate: (value: number) => void
}

export const RecipeCard = ({
  recipe,
  initialMenus,
  cardKey,
  onClick,
  forceUpdate,
  setForceUpdate,
}: RecipeCardProps) => {
  const user = useCurrentUser()
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
      className="flex h-full flex-col shadow transition-all duration-200 ease-in-out hover:cursor-pointer hover:shadow-xl dark:hover:bg-gray-900"
      onClick={() => onClick?.()}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/recipe/${recipe.id}`} className="flex grow flex-col">
            <CardHeader className="pb-2">
              <CardTitle>
                <Typography className="long-dashed-border border-b text-xl">
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
              <CardDescription className="line-clamp-3">
                {recipe.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                {!isZero(recipe.preparationTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className="mt-1 h-3 w-3" />
                    <Typography variant="light">Prep</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.preparationTime || '')}
                    </Typography>
                  </div>
                )}
                {!isZero(recipe.cookingTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className="mt-1 h-3 w-3" />
                    <Typography variant="light">Cook</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.cookingTime || '')}
                    </Typography>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex flex-row gap-1">
                    <Users className="mt-1 h-3 w-3" />
                    <Typography variant="light">Servings</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {removeServings(recipe.servings)}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex grow flex-col justify-end">
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
                <div className="flex flex-row items-center justify-between">
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
      <CardFooter className="flex flex-row items-center justify-end gap-4">
        {isOwner && (
          <Button asChild size="sm" variant="outline">
            <Link href={`/recipe/${recipe.id}/edit`}>Edit Recipe</Link>
          </Button>
        )}
        {loggedIn && initialMenus && (
          <AddRecipeToMenusModal
            user={user}
            recipe={recipe}
            initialMenus={initialMenus}
          >
            <Button size="sm">Add to Menu</Button>
          </AddRecipeToMenusModal>
        )}
      </CardFooter>
    </Card>
  )
}
