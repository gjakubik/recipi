'use client'

import * as React from 'react'
import _ from 'lodash'
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import { abbToUnit, fractionToFloat } from '@/lib/utils'

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
import { AddUnitModal } from '@/components/modals/AddUnitModal'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Plus } from 'lucide-react'

interface IngredientUnitSelectProps {
  index: number
  units: string[]
  field: ControllerRenderProps<FieldValues, `ingredients.${number}.unit`>
  addCustomUnit: (unit: string) => void
}
export function IngredientUnitSelect({
  index,
  units,
  field,
  addCustomUnit,
}: IngredientUnitSelectProps) {
  const form = useFormContext()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-[100px] justify-between"
        >
          {field.value
            ? _.capitalize(abbToUnit(field.value)) +
              (fractionToFloat(form.getValues(`ingredients.${index}.amount`)) >
              1
                ? 's'
                : '')
            : 'Select...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search unit..." className="h-9" />
          <CommandEmpty>No unit found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-scroll">
            {units.map((unit) => (
              <CommandItem
                key={unit}
                value={unit}
                onSelect={(currentValue) => {
                  form.setValue(
                    `ingredients.${index}.unit`,
                    _.capitalize(currentValue) === field.value
                      ? ''
                      : _.capitalize(currentValue)
                  )
                  setOpen(false)
                }}
              >
                {unit}
                {fractionToFloat(
                  form.getValues(`ingredients.${index}.amount`)
                ) > 1 && 's'}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup>
            <CommandItem>
              <AddUnitModal addCustomUnit={addCustomUnit}>
                <Button
                  size="xxs"
                  variant="ghost"
                  className="flex flex-row gap-1 items-center"
                >
                  <Plus width={15} className="mb-px" />
                  Add Unit
                </Button>
              </AddUnitModal>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
