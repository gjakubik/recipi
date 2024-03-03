'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import { useMediaQuery } from '@/hooks/use-media-query'

import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AddNoteModal } from '@/components/modals/AddNoteModal'
import { FormInput } from '@/components/FormInput'
import { IngredientUnitSelect } from '@/components/recipe/IngredientUnitSelect'
import { Ingredient, RecipeIngredientForm, RecipeIngredient } from '@/types'
import getIngredients from '@/lib/db/api/ingredient/getIngredients'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Plus } from 'lucide-react'
import { Input } from '../ui/input'

interface IngredientSearchBarProps {
  index: number
}

export const IngredientSearchBar = ({ index }: IngredientSearchBarProps) => {
  const form = useFormContext()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Ingredient[]>([])
  const [open, setOpen] = React.useState(false)

  const isTinyScreen = useMediaQuery(475)

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  const debouncedSearch = useDebounce(searchTerm, 1000)

  const searchIngredients = useMemo(async () => {
    if (debouncedSearch) {
      const ingredients = await getIngredients({
        search: debouncedSearch,
      })
      setSearchResults(ingredients.slice(0, 100))
    }
  }, [debouncedSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[100px] justify-between"
        >
          {form.getValues(`ingredients.${index}.description`)
            ? form.getValues(`ingredients.${index}.description`)
            : 'Search ingredients...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] p-0">
        <Command>
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-expanded={open}
            className="w-full min-w-[100px] justify-between"
          />
          <CommandEmpty>No ingredients found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] w-full overflow-y-scroll">
            {searchResults?.map((ing) => (
              <CommandItem
                key={ing.id}
                value={ing.description ? ing.description : ''}
                onSelect={(currentValue) => {
                  form.setValue(
                    `ingredients.${index}.description`,
                    currentValue
                  )
                  setOpen(false)
                }}
              >
                {ing.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
