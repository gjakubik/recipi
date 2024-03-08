'use client'

import React, { useState, useEffect } from 'react'
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
import { Typography } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown, X, ChevronLeft } from 'lucide-react'
import { useIngredientQuery } from '@/hooks/use-ingredient-query'
import { useDebouncedCallback } from 'use-debounce'

interface IngredientSelectorProps {
  onIngredientSelect?: (ingredient: Ingredient | null) => void
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  onIngredientSelect,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null)
  const [currentSelectionParts, setCurrentSelectionParts] = useState<string[]>(
    []
  )

  const { data: ingredientList, isLoading } = useIngredientQuery({
    search: searchTerm,
  })

  const handleSearch = useDebouncedCallback((value) => {
    setSearchTerm(value)
  }, 700)

  useEffect(() => {
    // Clear the selected ingredient and current selection parts when the search term changes
    setSelectedIngredient(null)
    setCurrentSelectionParts([])
    onIngredientSelect?.(null)
  }, [searchTerm, onIngredientSelect])

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
      setSelectedIngredient(selectedIngredient || null)
      onIngredientSelect?.(selectedIngredient || null)
      setCurrentSelectionParts([])
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
    setSelectedIngredient(null)
    onIngredientSelect?.(null)
  }

  return (
    <div className="relative">
      <Popover open={searchTerm !== '' && !selectedIngredient}>
        <PopoverTrigger asChild>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <Input
                placeholder="Search ingredients..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  handleSearch(e.target.value)
                }}
                className={cn(
                  'flex w-full items-center rounded-md border px-3 py-2',
                  selectedIngredient ? 'border-green-500' : 'border-red-500',
                  'pr-10' // Add padding to the right to make space for the icon
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {selectedIngredient ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            {selectedIngredient && (
              <Typography variant="light" className="text-xs text-green-500">
                Selected: {selectedIngredient.description}
              </Typography>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandEmpty>
              {isLoading ? 'Loading...' : 'No ingredients found.'}
            </CommandEmpty>
            <div className="max-h-60 overflow-y-auto">
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
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        currentSelectionParts[
                          currentSelectionParts.length - 1
                        ] === option
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={handleClearSelection} className="mt-2">
        Clear
      </Button>
    </div>
  )
}

export default IngredientSelector
