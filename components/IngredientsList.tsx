import _ from 'lodash'
import { Ingredient, InsertIngredient } from '@/lib/types'
import { unitValueToLabel } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'
import { DotFilledIcon } from '@radix-ui/react-icons'

interface IngredientsListProps {
  ingredients: InsertIngredient[] | Ingredient[]
}

export const IngredientsList = ({ ingredients }: IngredientsListProps) => (
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
