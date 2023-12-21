'use client'

import _ from 'lodash'
import { cn } from '@/lib/utils'
import { Ingredient, IngredientForm } from '@/lib/types'
import { unitValueToLabel } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'
import { DotFilledIcon } from '@radix-ui/react-icons'

interface IngredientsListProps {
  ingredients: IngredientForm[] | Ingredient[]
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
      <div className={cn(className, 'flex flex-col gap-0.5 w-full')}>
        {ingredients.map((ingredient, i) => (
          <div className="flex flex-row w-full" key={i}>
            <DotFilledIcon className="w-[15px] h-[15px] min-w-[15px] mt-1.5" />
            <Typography
              variant="pn"
              className=" w-max text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {ingredient.amount}{' '}
              {unitValueToLabel(ingredient.unit) || ingredient.unit}
              {parseFloat(ingredient.amount) > 1 && 's'}{' '}
              <b>{_.capitalize(ingredient.name)}</b> <i>{ingredient.note}</i>
            </Typography>
          </div>
        ))}
      </div>
    )

  if (v2)
    return (
      <div className="flex flex-col gap-2 w-full">
        {ingredients.map((ingredient, i) => (
          <div
            className="flex flex-row gap-2 items-center w-max overflow-hidden"
            key={i}
          >
            <div className="flex flex-row items-center">
              <div>
                <DotFilledIcon className="flex w-4 h-4" />
              </div>
              <div>
                <Typography>
                  {ingredient.amount}{' '}
                  {unitValueToLabel(ingredient.unit) || ingredient.unit}
                  {parseFloat(ingredient.amount) > 1 && 's'}
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
    <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-7-0 justify-items-star">
      {ingredients.map((ingredient) => (
        <>
          <div className="flex flex-row gap-2 justify-items-center">
            <div className="pt-px">
              <DotFilledIcon className="flex w-5 h-5 pt-1.5" />
            </div>
            <div>
              <Typography>
                {ingredient.amount}{' '}
                {unitValueToLabel(ingredient.unit) || ingredient.unit}
                {parseFloat(ingredient.amount) > 1 && 's'}
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
        </>
      ))}
    </div>
  )
}
