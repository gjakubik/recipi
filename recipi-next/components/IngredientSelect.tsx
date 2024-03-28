'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Ingredient } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Typography } from '@/components/ui/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Check, X, ChevronLeft } from 'lucide-react'
import { useIngredientQuery } from '@/hooks/use-ingredient-query'
import { useDebouncedCallback } from 'use-debounce'
import { Icons } from './CustomIcons'

interface IngredientSelectorProps {
  field: ControllerRenderProps<FieldValues, `ingredients.${number}.name`>
  index: number
  onIngredientSelect?: (ingredient: Ingredient | null) => void
  withClear?: boolean
}

export const IngredientSelector = ({
  field,
  index,
  onIngredientSelect,
  withClear = false,
}: IngredientSelectorProps) => {
  const { watch } = useFormContext()
  const db_name = watch(`ingredients.${index}.db_name`)
  const [searchTerm, setSearchTerm] = useState('')
  const [inputValue, setInputValue] = useState(field.value)
  const [currentSelectionParts, setCurrentSelectionParts] = useState<string[]>(
    []
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isSelected = db_name !== undefined && db_name !== ''

  const { data: ingredientList, isLoading } = useIngredientQuery({
    search: searchTerm,
    enabled: !isSelected && searchTerm !== '',
  })

  const handleSearch = useDebouncedCallback((value) => {
    setSearchTerm(value)
  }, 1000)

  // Get data onLoad if ing is not empty
  useEffect(() => {
    if (inputValue !== '') {
      setSearchTerm(inputValue)
    }
  }, [])

  useEffect(() => {
    console.log('running effect')
    if (
      !isLoading &&
      ingredientList &&
      ingredientList.length > 0 &&
      hasUserInteracted
    ) {
      console.log('setting popover open')
      setIsPopoverOpen(true)
    }
  }, [isLoading, ingredientList, hasUserInteracted])

  const getUniqueIngredients = (parts: string[]) => {
    const uniqueIngredients = new Set<string>()

    ingredientList?.forEach((ingredient) => {
      const ingredientParts = ingredient.description?.split(', ') || []
      const relevantParts = ingredientParts.slice(0, parts.length + 1)

      if (
        relevantParts.length > parts.length &&
        relevantParts
          .slice(0, parts.length)
          .every((part, index) => part === parts[index])
      ) {
        uniqueIngredients.add(relevantParts[parts.length])
      }
    })

    return Array.from(uniqueIngredients)
  }

  const currentOptions = getUniqueIngredients(currentSelectionParts)

  const handleOptionSelect = (option: string) => {
    const newSelectionParts = [...currentSelectionParts, option]
    setCurrentSelectionParts(newSelectionParts)

    // Automatically select options until a choice is needed
    let nextOptions = getUniqueIngredients(newSelectionParts)
    while (nextOptions.length === 1) {
      newSelectionParts.push(nextOptions[0])
      nextOptions = getUniqueIngredients(newSelectionParts)
    }

    if (nextOptions.length === 0) {
      // Leaf ingredient reached, update selected ingredient
      const selectedIngredientDescription = newSelectionParts.join(', ')
      const selectedIngredient = ingredientList?.find(
        (ingredient) => ingredient.description === selectedIngredientDescription
      )
      onIngredientSelect?.(selectedIngredient || null)
      setCurrentSelectionParts([])
      setIsPopoverOpen(false)
    }
  }

  const handleBackClick = () => {
    const newSelectionParts = [...currentSelectionParts]
    newSelectionParts.pop()

    // Go back to the last place a selection was needed
    let prevOptions = getUniqueIngredients(newSelectionParts)
    while (prevOptions.length === 1 && newSelectionParts.length > 0) {
      newSelectionParts.pop()
      prevOptions = getUniqueIngredients(newSelectionParts)
    }

    setCurrentSelectionParts(newSelectionParts)
  }

  const handleClearSelection = () => {
    setCurrentSelectionParts([])
    onIngredientSelect?.(null)
    setIsPopoverOpen(false)
    setInputValue('')
    setSearchTerm('')
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    handleSearch(value)
    if (isSelected) {
      onIngredientSelect?.(null)
    }
    setHasUserInteracted(true)
  }

  return (
    <div className="relative">
      <Popover open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex w-full flex-col items-start gap-1">
            <div className="relative w-full">
              <Input
                placeholder="Search ingredients..."
                autoComplete="off"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                ref={inputRef}
                className={cn(
                  'flex w-full items-center rounded-md border px-3 py-2 pr-10',
                  !isLoading && isSelected && 'border-green-500',
                  !isLoading && !isSelected && 'border-red-500'
                )}
              />
              {inputValue && (
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={(e) => {
                    console.log('clicked')
                    if (!isPopoverOpen) {
                      console.log('setting popover open')
                      setIsPopoverOpen(true)
                    }
                  }}
                >
                  {isLoading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin text-gray-500" />
                  ) : isSelected ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isSelected && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Typography
                    variant="light"
                    className="line-clamp-1 text-xs text-green-500"
                  >
                    {db_name}
                  </Typography>
                </TooltipTrigger>
                <TooltipContent side="bottom">{db_name}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          onPointerDownOutside={(e) => {
            console.log('pointer down outside')
            e.preventDefault()
            e.stopPropagation()
            setIsPopoverOpen(false)
          }}
        >
          <Command>
            <CommandEmpty>
              <Typography className="px-8">No ingredients found.</Typography>
            </CommandEmpty>
            <div className="max-h-60 w-fit min-w-[100px] max-w-[300px] overflow-auto">
              <CommandGroup>
                {currentSelectionParts.length > 0 && (
                  <CommandItem onSelect={handleBackClick}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </CommandItem>
                )}
                {currentOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleOptionSelect(option)}
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {withClear && (
        <Button onClick={handleClearSelection} className="mt-2">
          Clear
        </Button>
      )}
    </div>
  )
}
