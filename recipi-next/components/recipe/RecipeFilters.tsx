'use client'

import { PropsWithChildren, useState, useMemo, useCallback } from 'react'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs'
import _ from 'lodash'
import { parseAsStarRating } from '@/utils/urlParsing'
import { Recipe } from '@/types'
import { DEFAULT_PARAM_NAMES } from '@/lib/constants'
import {
  recipeSortByCookTime,
  recipeSortByPrepTime,
  recipeSortByServings,
} from '@/utils/sorting'
import { parseServings } from '@/utils/servings'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import {
  DrawerOrDialog,
  DrawerOrDialogFooter,
} from '@/components/DrawerOrDialog'
import { MaxTimeFilter } from '@/components/MaxTimeFilter'
import { ServingsRangeFilter } from '@/components/ServingsRangeFilter'
import { Checkbox, CheckboxArea } from '../ui/checkbox'

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

const defaultDifficulties = ['easy', 'medium', 'hard']

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

  const largestServings = useMemo(
    () =>
      parseServings(
        recipes.sort(recipeSortByServings('desc'))[0]?.servings
      )[1] || 25,
    [recipes]
  )

  const { numEasy, numMedium, numHard } = useMemo(() => {
    const difficulties = recipes.reduce(
      (acc, recipe) => {
        if (recipe.difficultyLevel === 'easy') {
          acc.numEasy += 1
        } else if (recipe.difficultyLevel === 'medium') {
          acc.numMedium += 1
        } else if (recipe.difficultyLevel === 'hard') {
          acc.numHard += 1
        }
        return acc
      },
      { numEasy: 0, numMedium: 0, numHard: 0 }
    )
    return difficulties
  }, [recipes])

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
    parseAsInteger.withDefault(largestServings)
  )
  const [difficultyLevel, setDifficultyLevelQuery] = useQueryState(
    paramNames?.difficultyLevel || DEFAULT_PARAM_NAMES.difficultyLevel,
    parseAsArrayOf(parseAsString).withDefault(defaultDifficulties)
  )
  const [rating, setRating] = useQueryState(
    paramNames?.rating || DEFAULT_PARAM_NAMES.rating,
    parseAsStarRating.withDefault(0)
  )

  const [isOpen, setIsOpen] = useState(false)

  // Create local state for filter inputs
  const [maxPrepTimeState, setMaxPrepTimeState] = useState(maxPrepTime)
  const [maxCookTimeState, setMaxCookTimeState] = useState(maxCookTime)
  const [minServingsState, setMinServingsState] = useState(minServings)
  const [maxServingsState, setMaxServingsState] = useState(maxServings)
  const [difficultyLevelState, setDifficultyLevelState] =
    useState(difficultyLevel)

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
      maxServingsState !== maxServings && maxServingsState !== largestServings
        ? maxServingsState
        : null
    )
  }, [maxServingsState, setMaxServingsState])

  const setDifficultyLevel = useCallback(() => {
    setDifficultyLevelQuery(
      !_.isEqual(difficultyLevelState, defaultDifficulties) &&
        difficultyLevelState?.length !== 0
        ? difficultyLevelState.filter((level) => {
            if (level === 'easy' && numEasy === 0) return false
            if (level === 'medium' && numMedium === 0) return false
            if (level === 'hard' && numHard === 0) return false
            return true
          })
        : null
    )
  }, [difficultyLevelState, setDifficultyLevelState])

  const handleDifficultyCheckboxChange = useCallback(
    (level: string) => {
      setDifficultyLevelState((prev) => {
        if (prev?.includes(level)) {
          return prev?.filter((l) => l !== level)
        } else {
          return prev ? [...prev, level] : [level]
        }
      })
    },
    [setDifficultyLevelState]
  )

  //Add onClose function that resets the filter values to whatever is in the query state
  return (
    <DrawerOrDialog
      title="Filters"
      description="Filter the recipes by various criteria"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerChildren={children}
      onClose={() => {
        // Reset local state to query state
        setMaxPrepTimeState(maxPrepTime)
        setMaxCookTimeState(maxCookTime)
        setMinServingsState(minServings)
        setMaxServingsState(maxServings)
        setDifficultyLevelState(difficultyLevel)
      }}
    >
      <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex flex-grow flex-col gap-4">
          <ServingsRangeFilter
            minServingsState={minServingsState}
            maxServingsState={maxServingsState}
            setMinServingsState={setMinServingsState}
            setMaxServingsState={setMaxServingsState}
            largestServings={largestServings}
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
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-row items-baseline justify-between">
              <Label>Difficulty Levels</Label>
              <Button
                className="py-0"
                size="xxs"
                variant="text"
                onClick={() => setDifficultyLevelState(defaultDifficulties)}
              >
                Reset
              </Button>
            </div>
            <CheckboxArea disabled={numEasy === 0}>
              <Checkbox
                disabled={numEasy === 0}
                checked={difficultyLevelState?.includes('easy') && numEasy > 0}
                onCheckedChange={() => handleDifficultyCheckboxChange('easy')}
              />
              <span className="ml-2">Easy</span>
            </CheckboxArea>
            <CheckboxArea disabled={numMedium === 0}>
              <Checkbox
                disabled={numMedium === 0}
                checked={
                  difficultyLevelState?.includes('medium') && numMedium > 0
                }
                onCheckedChange={() => handleDifficultyCheckboxChange('medium')}
              />
              <span className="ml-2">Medium</span>
            </CheckboxArea>
            <CheckboxArea disabled={numHard === 0}>
              <Checkbox
                disabled={numHard === 0}
                checked={difficultyLevelState?.includes('hard') && numHard > 0}
                onCheckedChange={() => handleDifficultyCheckboxChange('hard')}
              />
              <span className="ml-2">Hard</span>
            </CheckboxArea>
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
            setMaxServingsState(largestServings)
            setDifficultyLevelState(defaultDifficulties)
            setRating(null)
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
