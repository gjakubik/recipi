'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { HamburgerMenuIcon, PlusIcon, Cross1Icon } from '@radix-ui/react-icons'

interface EditIngredientItemProps {
  id: string
  index: number
  onDelete?: (id: string) => void
}

export const EditIngredientItem = ({
  id,
  index,
  onDelete,
}: EditIngredientItemProps) => {
  const form = useFormContext()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex flex-row justify-between items-end max-w-[600px] m-auto">
        <div className="flex flex-row items-end w-[400px]">
          <div {...listeners} className="p-2.5">
            <HamburgerMenuIcon />
          </div>

          <FormInput
            name={`ingredients.${index}.name`}
            placeholder="Ingredient name..."
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <PlusIcon /> Note
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-row items-end gap-1">
          <FormInput
            name={`ingredients.${index}.amount`}
            className="w-[80px]"
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.unit`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
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
          <Button
            variant="ghost"
            className="p-2.5"
            onClick={() => onDelete?.(id)}
          >
            <Cross1Icon />
          </Button>
        </div>
      </div>
    </div>
  )
}
