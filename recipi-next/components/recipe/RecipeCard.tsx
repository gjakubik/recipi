'use client'

import { useState, useMemo, useLayoutEffect, useRef } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Image from 'next/image'
import { GetMenusResult, MenuWithRecipes, Recipe } from '@/types'
import { useResizableRef } from '@/hooks/use-resizable-observer'
import useSearch from '@/app/store/useSearch'
import { cn, isZero, removeServings, timeValueToLabel } from '@/lib/utils'
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
import { AddRecipeToMenusModal } from '@/components/modals/AddRecipeToMenusModal'
import { UserAvatar } from '@/components/UserAvatar'
import { Clock, Users, GraduationCap, Lock } from 'lucide-react'

interface RecipeCardProps {
  recipe: Recipe
  menus: MenuWithRecipes[]
  cardKey: string | number
  onClick?: () => void
  forceUpdate: number
  setForceUpdate: (value: number) => void
}

export const RecipeCard = ({
  recipe,
  menus,
  cardKey,
  onClick,
  forceUpdate,
  setForceUpdate,
}: RecipeCardProps) => {
  const user = useCurrentUser()
  const { search } = useSearch()
  const [showAllIngredients, setShowAllIngredients] = useState(false)

  const { targetRef, dimensions } = useResizableRef()

  const titleRef = useRef<HTMLParagraphElement>(null)

  // If performance becomes an issue, consider refactoring this to be a bit more efficient
  const wordClasses = useMemo(
    () =>
      recipe.title.split(' ').map((_, index) => {
        if (titleRef.current) {
          const words = titleRef.current.getElementsByTagName('span')
          const wordsLength = words.length
          const threshold = 10
          const word = words[index]
          const prevWord = index > 0 ? words[index - 1] : null
          const nextWord = index < wordsLength - 1 ? words[index + 1] : null

          const isFirstWord = index === 0
          const isLastWord = index === wordsLength - 1
          const isFirstWordOfLine =
            !prevWord ||
            Math.abs(
              word.getBoundingClientRect().top -
                prevWord.getBoundingClientRect().top
            ) > threshold
          const isLastWordOfLine =
            !nextWord ||
            Math.abs(
              word.getBoundingClientRect().top -
                nextWord.getBoundingClientRect().top
            ) > threshold

          let aboveLineExists = false
          let belowLineExists = false
          let aboveLineIsLonger = false
          let belowLineIsLonger = false

          for (
            let findAboveIdx = index - 1;
            findAboveIdx >= 0;
            findAboveIdx--
          ) {
            const aboveWord = words[findAboveIdx]
            if (
              Math.abs(
                aboveWord.getBoundingClientRect().top -
                  word.getBoundingClientRect().top
              ) > threshold
            ) {
              aboveLineExists = true
              aboveLineIsLonger =
                aboveWord.getBoundingClientRect().x +
                  aboveWord.getBoundingClientRect().width >
                word.getBoundingClientRect().x +
                  word.getBoundingClientRect().width
              break
            }
          }

          for (
            let findBelowIdx = index + 1;
            findBelowIdx < wordsLength;
            findBelowIdx++
          ) {
            const belowWord = words[findBelowIdx]
            if (
              Math.abs(
                belowWord.getBoundingClientRect().top -
                  word.getBoundingClientRect().top
              ) > threshold
            ) {
              belowLineExists = true
              if (
                Math.abs(
                  words[findBelowIdx + 1]?.getBoundingClientRect().top -
                    belowWord.getBoundingClientRect().top
                ) > threshold
              ) {
                belowLineIsLonger =
                  belowWord.getBoundingClientRect().x +
                    belowWord.getBoundingClientRect().width >
                  word.getBoundingClientRect().x +
                    word.getBoundingClientRect().width
                break
              }
            }
          }

          const isWordOnLastLine =
            Math.abs(
              word.getBoundingClientRect().top -
                words[wordsLength - 1].getBoundingClientRect().top
            ) < threshold
          const isFirstWordOfLastLine = isWordOnLastLine && isFirstWordOfLine

          return cn(
            'inline bg-black pt-0.5 pb-1',
            aboveLineExists ? 'pt-0' : '',
            // belowLineExists ? 'pb-0' : '',
            isFirstWord || isFirstWordOfLine ? 'pl-2' : '',
            isLastWord || isLastWordOfLine ? 'pr-2' : '',
            isFirstWord ? 'rounded-tl-sm' : '',
            isLastWord ? 'rounded-br-sm' : '',
            isFirstWordOfLastLine ? 'rounded-bl-sm' : '',
            isLastWordOfLine && !aboveLineIsLonger ? 'rounded-tr-sm' : '',
            isLastWordOfLine && !belowLineIsLonger ? 'rounded-br-sm' : ''
          )
        }
        return 'inline bg-black bg-opacity-50 py-0.5'
      }),
    [dimensions.height, dimensions.width, forceUpdate]
  )

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
      className="flex h-full flex-col shadow transition-all duration-200 ease-in-out hover:cursor-pointer hover:shadow-xl dark:hover:bg-accent"
      onClick={() => onClick?.()}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/recipe/${recipe.id}`} className="flex grow flex-col">
            {recipe.titleImage ? (
              <div className="relative mb-2">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={recipe.titleImage.url}
                    alt={recipe.title}
                    fill
                    className="rounded-t-md object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </AspectRatio>

                <CardHeader className="absolute bottom-0 left-0 m-0 p-0 pb-4 pl-6 pr-2">
                  <div className="flex w-full flex-row items-center">
                    {recipe.isPrivate && <Lock className="mr-2 h-4 w-4" />}
                    <CardTitle className="grow">
                      <div
                        ref={titleRef}
                        className="text-xl font-bold leading-[23.5px] text-white"
                      >
                        {recipe.title.split(' ').map((word, index) => (
                          <span key={index} className={wordClasses[index]}>
                            {word}{' '}
                          </span>
                        ))}
                      </div>
                    </CardTitle>
                  </div>
                </CardHeader>
              </div>
            ) : (
              <CardHeader className="pb-2 pt-2">
                <div className="flex w-full flex-row items-center">
                  {recipe.isPrivate && <Lock className="mr-2 h-4 w-4" />}
                  <CardTitle className="grow">
                    <Typography
                      className={cn('long-dashed-border pb-1 text-xl', {
                        'pt-2': !recipe.titleImage,
                      })}
                    >
                      {recipe.title}
                    </Typography>
                  </CardTitle>
                </div>
              </CardHeader>
            )}
            <CardContent className="flex grow flex-col justify-between gap-2">
              <CardDescription className="line-clamp-3">
                {recipe.description}
              </CardDescription>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <Typography variant="light">Difficulty</Typography>
                  <Typography variant="extralight" className="ml-1">
                    {_.capitalize(recipe.difficultyLevel)}
                  </Typography>
                </div>
                {!isZero(recipe.preparationTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className=" h-4 w-4" />
                    <Typography variant="light">Prep</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.preparationTime || '')}
                    </Typography>
                  </div>
                )}
                {!isZero(recipe.cookingTime) && (
                  <div className="flex flex-row gap-1">
                    <Clock className=" h-4 w-4" />
                    <Typography variant="light">Cook</Typography>
                    <Typography variant="extralight" className="ml-1">
                      {timeValueToLabel(recipe.cookingTime || '')}
                    </Typography>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex flex-row gap-1">
                    <Users className="h-4 w-4" />
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
                    {recipe.updatedAt.toLocaleDateString()}
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
        {loggedIn && menus && (
          <AddRecipeToMenusModal
            user={user}
            recipe={recipe}
            menus={menus}
            paramNames={{
              page: 'menuPage',
              limit: 'menuLimit',
              search: 'menuSearch',
            }}
          >
            <Button size="sm">Add to Menu</Button>
          </AddRecipeToMenusModal>
        )}
      </CardFooter>
    </Card>
  )
}
