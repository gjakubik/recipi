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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      key={id}
      suppressHydrationWarning
    >
      <div className="flex flex-row gap-2 items-end max-w-[600px] m-auto">
        <div {...listeners} className="p-2.5">
          <HamburgerMenuIcon />
        </div>

        <FormInput
          name={`ingredients.${index}.amount`}
          className="w-[60px]"
          onBlur={() => {
            updateIngredient(index, {
              ...form.getValues(`ingredients.${index}`),
              amount: form.getValues(`ingredients.${index}.amount`),
            })
          }}
        />
        <FormField
          control={form.control}
          name={`ingredients.${index}.unit`}
          render={({ field }) => (
            <FormItem>
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
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Type</SelectLabel>
                    {UNIT_OPTIONS.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
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

        <div className="grow">
          <FormInput
            name={`ingredients.${index}.name`}
            placeholder="Ingredient name..."
            onBlur={() => {
              updateIngredient(index, {
                ...form.getValues(`ingredients.${index}`),
                name: form.getValues(`ingredients.${index}.name`),
              })
            }}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <div className="pr-2">
                {hasNote ? <Pencil1Icon /> : <PlusIcon />}
              </div>{' '}
              Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a note</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Add some flavor to your ingredient
            </DialogDescription>
            <FormField
              control={form.control}
              name={`ingredients.${index}.note`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add a note..."
                      className="w-full"
                      onBlur={() => {
                        updateIngredient(index, {
                          ...form.getValues(`ingredients.${index}`),
                          note: form.getValues(`ingredients.${index}.note`),
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          className="p-2.5"
          onClick={() => onDelete?.(id)}
        >
          <Cross1Icon />
        </Button>
      </div>
    </div>
  )
}
