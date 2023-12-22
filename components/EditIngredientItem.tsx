'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormInput } from '@/components/FormInput'
import { UNIT_OPTIONS } from '@/lib/constants'
import {
  HamburgerMenuIcon,
  PlusIcon,
  Cross1Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons'
import { RecipeFormValues } from '@/lib/validations/recipe'
import { AddNoteModal } from './AddNoteModal'

interface EditIngredientItemProps {
  id: string
  index: number
  onDelete?: (id: string) => void
  updateIngredient: UseFieldArrayUpdate<RecipeFormValues, 'ingredients'>
  hasNote?: boolean
}

export const EditIngredientItem = ({
  id,
  index,
  onDelete,
  updateIngredient,
  hasNote,
}: EditIngredientItemProps) => {
  const form = useFormContext()
  const { attributes, listeners, node, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
              className="w-[60px] grow"
              label="Amount"
              labelClassName="flex sm:hidden"
              onBlur={() => {
                updateIngredient(index, {
                  ...form.getValues(`ingredients.${index}`),
                  amount: form.getValues(`ingredients.${index}.amount`),
                })
              }}
            />
            <div className="grow-[2]">
              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex sm:hidden">Unit</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e)
                        updateIngredient(index, {
                          ...form.getValues(`ingredients.${index}`),
                          unit: e,
                        })
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full min-w-[100px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Unit Type</SelectLabel>
                          {UNIT_OPTIONS.map((option) => {
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            )
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
          <div className="grow flex flex-row gap-2 items-center w-full">
            <div className="grow">
              <FormInput
                name={`ingredients.${index}.name`}
                placeholder="Ingredient name..."
                label="Name"
                labelClassName="flex sm:hidden"
                onBlur={() => {
                  console.log('updating')
                  updateIngredient(index, {
                    ...form.getValues(`ingredients.${index}`),
                    name: form.getValues(`ingredients.${index}.name`),
                  })
                }}
              />
            </div>
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
