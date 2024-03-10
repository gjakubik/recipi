'use client'

import React, { useState, useEffect } from 'react'
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
  CommandInput,
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

interface IngredientSelectorProps {
  field: ControllerRenderProps<FieldValues, `ingredients.${number}.name`>
  index: number
  onIngredientSelect?: (ingredient: Ingredient | null) => void
  withClear?: boolean
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  field,
  index,
  onIngredientSelect,
  withClear = false,
}) => {
  const { watch } = useFormContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSelectionParts, setCurrentSelectionParts] = useState<string[]>(
    []
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const db_name = watch(`ingredients.${index}.db_name`)
  const isSelected = db_name !== undefined && db_name !== ''

  const { data: ingredientList, isLoading } = useIngredientQuery({
    search: searchTerm,
  })

  const handleSearch = useDebouncedCallback((value) => {
    setSearchTerm(value)
  }, 1000)

  // call handleSearch when the input value changes
  useEffect(() => {
    if (isSelected && searchTerm !== field.value) {
      onIngredientSelect?.(null)
      setIsPopoverOpen(false)
    }
    handleSearch(field.value)
  }, [field.value])

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
  }

  return (
    <div className="relative">
      <Popover open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-col gap-1">
            {isSelected && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Typography
                    variant="light"
                    className="line-clamp-1 text-xs text-green-500"
                  >
                    Selected: {db_name}
                  </Typography>
                </TooltipTrigger>
                <TooltipContent>{db_name}</TooltipContent>
              </Tooltip>
            )}
            <div className="relative">
              <Input
                placeholder="Search ingredients..."
                {...field}
                // onBlur={() => setIsPopoverOpen(false)}
                className={cn(
                  'flex w-full items-center rounded-md border px-3 py-2',
                  isSelected ? 'border-green-500' : 'border-red-500',
                  'pr-10' // Add padding to the right to make space for the icon
                )}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                {isSelected ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
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
                    {/* <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        currentSelectionParts.includes(option)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    /> */}
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

export default IngredientSelector
