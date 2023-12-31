'use client'

import React, { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form'
import { RecipeFormValues } from '@/lib/validations/recipe'
import { OptionType } from '@/types'

import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AddNoteModal } from '@/components/modals/AddNoteModal'
import { FormInput } from '@/components/FormInput'
import {
  HamburgerMenuIcon,
  PlusIcon,
  Cross1Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons'
import { IngredientUnitSelect } from './IngredientUnitSelect'

interface EditIngredientItemProps {
  id: string
  index: number
  units: string[]
  onDelete?: (id: string) => void
  updateIngredient: UseFieldArrayUpdate<RecipeFormValues, 'ingredients'>
  addCustomUnit: (unit: string) => void
  hasNote?: boolean
}

export const EditIngredientItem = ({
  id,
  index,
  units,
  onDelete,
  updateIngredient,
  addCustomUnit,
  hasNote,
}: EditIngredientItemProps) => {
  const form = useFormContext()
  const { attributes, listeners, node, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Hack to prevent SSR mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full"
      {...attributes}
      key={id}
      suppressHydrationWarning
    >
      <div className="flex flex-row gap-2 items-center sm:items-end max-w-[600px] m-auto  mt-6 sm:mt-0">
        <div {...listeners} className="p-2.5">
          <HamburgerMenuIcon />
        </div>
        <div className="grow flex flex-col sm:flex-row gap-2 items-start sm:items-end w-full">
          <div className="flex flex-row gap-2 items-end w-full">
            <FormInput
              name={`ingredients.${index}.amount`}
              className="w-[60px]"
              label="Amount"
              labelClassName={`flex ${index !== 0 ? 'sm:hidden' : ''}`}
              onBlur={() => {
                updateIngredient(index, {
                  ...form.getValues(`ingredients.${index}`),
                  amount: form.getValues(`ingredients.${index}.amount`),
                })
              }}
            />
            <div className="grow">
              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`flex ${index !== 0 ? 'sm:hidden' : ''}`}
                    >
                      Unit
                    </FormLabel>
                    <IngredientUnitSelect
                      field={field}
                      index={index}
                      units={units}
                      addCustomUnit={addCustomUnit}
                    />
                  </FormItem>
                )}
              />
            </div>

            <AddNoteModal index={index} updateIngredient={updateIngredient}>
              <Button variant="ghost" className="hidden xs:flex sm:hidden">
                <div className="pr-2">
                  {hasNote ? <Pencil1Icon /> : <PlusIcon />}
                </div>{' '}
                Note
              </Button>
            </AddNoteModal>
          </div>
          <div className="grow w-full">
            <FormInput
              name={`ingredients.${index}.name`}
              placeholder="Ingredient name..."
              label="Name"
              labelClassName={`flex ${index !== 0 ? 'sm:hidden' : ''}`}
              className="w-full"
              onBlur={() => {
                updateIngredient(index, {
                  ...form.getValues(`ingredients.${index}`),
                  name: form.getValues(`ingredients.${index}.name`),
                })
              }}
            />
          </div>
          <AddNoteModal index={index} updateIngredient={updateIngredient}>
            <Button variant="ghost" className="flex xs:hidden sm:flex p-0">
              <div className="pr-2">
                {hasNote ? <Pencil1Icon /> : <PlusIcon />}
              </div>{' '}
              Note
            </Button>
          </AddNoteModal>
        </div>
        <Button
          variant="ghost"
          className="p-2.5 px-1.5 sm:px-2.5"
          onClick={() => onDelete?.(id)}
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}
