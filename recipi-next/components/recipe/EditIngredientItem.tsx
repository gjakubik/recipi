'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form'
import { RecipeFormValues } from '@/lib/validations/recipe'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useFeatureFlags } from '@/hooks/use-feature-flags'

import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AddNoteModal } from '@/components/modals/AddNoteModal'
import { FormInput } from '@/components/FormInput'
import { IngredientUnitSelect } from '@/components/recipe/IngredientUnitSelect'
import {
  HamburgerMenuIcon,
  PlusIcon,
  Cross1Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons'
import { Ingredient, RecipeIngredientForm, RecipeIngredient } from '@/types'
import { RowSelectionState } from '@tanstack/react-table'
import { IngredientSearchBar } from './IngredientSearchBar'
import { IngredientSelector } from '../IngredientSelect'

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
  const { useIngredientSelector } = useFeatureFlags()
  const { attributes, listeners, node, setNodeRef, transform, transition } =
    useSortable({ id })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const isTinyScreen = useMediaQuery(475)

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
      <div className="m-auto mt-6 flex w-full flex-row items-center gap-2  sm:mt-0 sm:items-start">
        <div
          {...listeners}
          className={cn('p-2.5', index === 0 ? 'mt-[22px]' : 'mt-[8px]')}
        >
          <HamburgerMenuIcon />
        </div>
        <div className="flex w-full grow flex-col items-start gap-2 sm:flex-row sm:items-start">
          <div className="flex w-full flex-row items-end gap-2">
            <FormInput
              name={`ingredients.${index}.amount`}
              className="w-[40px] xs:w-[60px]"
              label={isTinyScreen ? 'Qty' : 'Amount'}
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
          <div className="w-full grow">
            {!useIngredientSelector ? (
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({}) => (
                  <FormItem>
                    <FormLabel
                      className={`flex ${index !== 0 ? 'sm:hidden' : ''}`}
                    >
                      Name
                    </FormLabel>
                    <IngredientSearchBar index={index} />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`flex ${index !== 0 ? 'sm:hidden' : ''}`}
                    >
                      Name
                    </FormLabel>
                    <IngredientSelector
                      field={field}
                      index={index}
                      onIngredientSelect={(ingredient) => {
                        form.setValue(
                          `ingredients.${index}.db_name`,
                          ingredient?.description
                        )
                        form.setValue(
                          `ingredients.${index}.db_uuid`,
                          ingredient?.id
                        )
                      }}
                    />
                  </FormItem>
                )}
              />
            )}
          </div>
          <AddNoteModal index={index} updateIngredient={updateIngredient}>
            <Button
              variant="ghost"
              className={cn(
                'flex xs:hidden sm:flex',
                index === 0 ? 'sm:mt-[22px]' : 'sm:mt-[8px]'
              )}
            >
              <div className="pr-2">
                {hasNote ? <Pencil1Icon /> : <PlusIcon />}
              </div>{' '}
              Note
            </Button>
          </AddNoteModal>
        </div>
        <Button
          variant="ghost"
          className={cn(
            'p-2.5 px-1.5 sm:px-2.5',
            index === 0 ? 'mt-[22px]' : 'mt-[8px]'
          )}
          onClick={() => onDelete?.(id)}
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}
