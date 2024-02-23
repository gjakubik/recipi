'use client'

import React from 'react'
import _ from 'lodash'
import { cn } from '@/lib/utils'
import { RecipeIngredient, RecipeIngredientForm } from '@/types'
import { abbToUnit } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { FormLabel } from '@/components/ui/form'
import { DotFilledIcon } from '@radix-ui/react-icons'

interface IngredientsListProps {
  ingredients: RecipeIngredientForm[] | RecipeIngredient[]
  className?: string
  v2?: boolean
  v3?: boolean
}

export const IngredientsList = ({
  ingredients,
  className,
  v2,
  v3,
}: IngredientsListProps) => {
  if (v3)
    return (
      <div className={cn(className, 'flex w-full flex-col gap-0.5')}>
        {ingredients.map((ingredient, i) => (
          <div className="flex w-full flex-row" key={i}>
            <div className="pt-px">
              <DotFilledIcon className="mt-1 h-[10px] w-[10px] min-w-[10px]" />
            </div>
            <Typography
              variant="light"
              className=" w-max overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {ingredient.amount}{' '}
              {_.capitalize(abbToUnit(ingredient.unit || ''))}
              {parseFloat(ingredient.amount || '') > 1 &&
                ingredient.unit &&
                's'}{' '}
              <b>{_.capitalize(ingredient.name)}</b> <i>{ingredient.note}</i>
            </Typography>
          </div>
        ))}
      </div>
    )

  if (v2)
    return (
      <div className="flex w-full flex-col gap-2">
        {ingredients.map((ingredient, i) => (
          <div
            className="flex w-max flex-row items-center gap-2 overflow-hidden"
            key={i}
          >
            <div className="flex flex-row items-center">
              <div>
                <DotFilledIcon className="flex h-4 w-4" />
              </div>
              <div>
                <Typography>
                  {ingredient.amount}{' '}
                  {_.capitalize(abbToUnit(ingredient.unit || ''))}
                  {parseFloat(ingredient.amount || '') > 1 &&
                    ingredient.unit &&
                    's'}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="bold">
                {_.capitalize(ingredient.name)}
              </Typography>
            </div>
            <div>
              <Typography variant="light" className="pt-px">
                {ingredient.note}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    )

  return (
    <div className="gap-7-0 grid grid-cols-[auto_auto_1fr] gap-x-4 pt-2">
      <FormLabel>Amount</FormLabel>
      <FormLabel>Ingredient</FormLabel>
      <FormLabel className="mb-2">Note</FormLabel>
      {ingredients.map((ingredient, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-row justify-items-center gap-2">
            {/* <div className="pt-px">
              <DotFilledIcon className="flex w-5 h-5 pt-1.5" />
            </div> */}
            <div>
              <Typography>
                {ingredient.amount}{' '}
                {_.capitalize(abbToUnit(ingredient.unit || ''))}
                {parseFloat(ingredient.amount || '') > 1 &&
                  ingredient.unit &&
                  's'}
              </Typography>
            </div>
          </div>
          <div>
            <Typography>{_.capitalize(ingredient.name)}</Typography>
          </div>
          <div className="pt-px">
            <Typography variant="light" className="pt-1">
              {ingredient.note}
            </Typography>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
