'use client'

import {
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs'
import { parseAsStarRating } from '@/utils/urlParsing'
import { Recipe } from '@/types'
import { DEFAULT_PARAM_NAMES } from '@/lib/constants'
import { secondsToTime, timeInSeconds, timeValueToLabel, cn } from '@/lib/utils'
import { recipeSortByCookTime, recipeSortByPrepTime } from '@/utils/sorting'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { RangeSlider } from '@/components/ui/range-slider'

import {
  DrawerOrDialog,
  DrawerOrDialogFooter,
} from '@/components/DrawerOrDialog'
import { MaxTimeFilter } from '@/components/MaxTimeFilter'
import { ServingsRangeFilter } from '@/components/ServingsRangeFilter'

export interface RecipeFiltersProps extends PropsWithChildren {
  recipes: Recipe[]
  paramNames?: {
    maxPrepTime?: string
    maxCookTime?: string
    maxTotalTime?: string
    minServings?: string
    maxServings?: string
    difficultyLevel?: string
    rating?: string
  }
}

export const RecipeFilters = ({
  recipes,
  paramNames,
  children,
}: RecipeFiltersProps) => {
  // Get largest prep and cook time to serve as our defaults
  const largestPrepTime = useMemo(
    () =>
      recipes.sort(recipeSortByPrepTime('desc'))[0]?.preparationTime ||
      '1:00:00',
    [recipes]
  )
  const largestCookTime = useMemo(
    () =>
      recipes.sort(recipeSortByCookTime('desc'))[0]?.cookingTime || '1:00:00',
    [recipes]
  )

  // TODO: get largest servings from recipes to replace magic number 25
  // need to handle null servings and range servings

  // Derive state from query params, create setters
  const [maxPrepTime, setMaxPrepTimeQuery] = useQueryState(
    paramNames?.maxPrepTime || DEFAULT_PARAM_NAMES.maxPrepTime,
    parseAsString.withDefault(largestPrepTime)
  )
  const [maxCookTime, setMaxCookTimeQuery] = useQueryState(
    paramNames?.maxCookTime || DEFAULT_PARAM_NAMES.maxCookTime,
    parseAsString.withDefault(largestCookTime)
  )
  const [maxTotalTime, setMaxTotalTime] = useQueryState(
    paramNames?.maxTotalTime || DEFAULT_PARAM_NAMES.maxTotalTime
  )
  const [minServings, setMinServingsQuery] = useQueryState(
    paramNames?.minServings || DEFAULT_PARAM_NAMES.minServings,
    parseAsInteger.withDefault(0)
  )
  const [maxServings, setMaxServingsQuery] = useQueryState(
    paramNames?.maxServings || DEFAULT_PARAM_NAMES.maxServings,
    parseAsInteger.withDefault(25)
  )
  const [difficultyLevel, setDifficultyLevelQuery] = useQueryState(
    paramNames?.difficultyLevel || DEFAULT_PARAM_NAMES.difficultyLevel
  )
  const [rating, setRating] = useQueryState(
    paramNames?.rating || DEFAULT_PARAM_NAMES.rating,
    parseAsStarRating.withDefault(0)
  )

  const [isOpen, setIsOpen] = useState(false)

  // See https://github.com/radix-ui/primitives/issues/1569#issuecomment-1420810427 to understand why we need this
  const [forceDropdownReset, setForceDropdownReset] = useState(0)

  // Create local state for filter inputs
  const [maxPrepTimeState, setMaxPrepTimeState] = useState(maxPrepTime)
  const [maxCookTimeState, setMaxCookTimeState] = useState(maxCookTime)
  const [minServingsState, setMinServingsState] = useState(minServings)
  const [maxServingsState, setMaxServingsState] = useState(maxServings)
  const [difficultyLevelState, setDifficultyLevelState] = useState<
    string | undefined
  >(difficultyLevel ? difficultyLevel : undefined)

  const setMaxPrepTime = useCallback(
    () =>
      setMaxPrepTimeQuery(
        maxPrepTimeState !== maxPrepTime && maxPrepTimeState !== largestPrepTime
          ? maxPrepTimeState
          : null
      ),
    [setMaxPrepTimeQuery, maxPrepTimeState]
  )

  const setMaxCookTime = useCallback(
    () =>
      setMaxCookTimeQuery(
        maxCookTimeState !== maxCookTime && maxCookTimeState !== largestCookTime
          ? maxCookTimeState
          : null
      ),
    [setMaxCookTimeQuery, maxCookTimeState]
  )

  const setMinServings = useCallback(() => {
    setMinServingsQuery(
      minServingsState !== minServings && minServingsState !== 0
        ? minServingsState
        : null
    )
  }, [minServingsState, setMinServingsState])

  const setMaxServings = useCallback(() => {
    setMaxServingsQuery(
      maxServingsState !== maxServings && maxServingsState !== 25
        ? maxServingsState
        : null
    )
  }, [maxServingsState, setMaxServingsState])

  const setDifficultyLevel = useCallback(() => {
    setDifficultyLevelQuery(
      difficultyLevelState !== difficultyLevel && difficultyLevelState !== ''
        ? difficultyLevelState
          ? difficultyLevelState
          : null
        : null
    )
  }, [difficultyLevelState, setDifficultyLevelState])

  //Add onClose function that resets the filter values to whatever is in the query state

  return (
    <DrawerOrDialog
      title="Filters"
      description="Filter the recipes by various criteria"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerChildren={children}
    >
      <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex flex-grow flex-col gap-4">
          <ServingsRangeFilter
            minServingsState={minServingsState}
            maxServingsState={maxServingsState}
            setMinServingsState={setMinServingsState}
            setMaxServingsState={setMaxServingsState}
            label="Servings"
          />
          <MaxTimeFilter
            maxTimeState={maxPrepTimeState}
            setMaxTimeState={setMaxPrepTimeState}
            largestTime={largestPrepTime}
            label="Max Prep Time"
          />
          <MaxTimeFilter
            maxTimeState={maxCookTimeState}
            setMaxTimeState={setMaxCookTimeState}
            largestTime={largestCookTime}
            label="Max Cook Time"
          />
        </div>

        <div className="flex flex-grow flex-col gap-4">
          <div className="flex flex-col gap-3 pt-2">
            <Label>Difficulty Level</Label>
            <Select
              key={`difficulty-level-${forceDropdownReset}`}
              value={difficultyLevelState}
              onValueChange={setDifficultyLevelState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DrawerOrDialogFooter>
        <Button
          variant="ghost"
          onClick={async () => {
            //clear all filter values
            setMaxPrepTimeState(largestPrepTime)
            setMaxCookTimeState(largestCookTime)
            setMinServingsState(0)
            setMaxServingsState(25)
            setDifficultyLevelState(undefined)
            setRating(null)

            //force dropdown reset
            setForceDropdownReset((prev) => prev + 1)
          }}
        >
          Clear Filters
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setMaxPrepTime()
            setMaxCookTime()
            setMinServings()
            setMaxServings()
            setDifficultyLevel()
            setIsOpen(false)
          }}
        >
          Apply Filters
        </Button>
      </DrawerOrDialogFooter>
    </DrawerOrDialog>
  )
}
