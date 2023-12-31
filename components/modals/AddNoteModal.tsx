'use client'

import { PropsWithChildren } from 'react'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form'
import { RecipeFormValues } from '@/lib/validations/recipe'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface AddNoteModalProps extends PropsWithChildren {
  index: number
  updateIngredient: UseFieldArrayUpdate<RecipeFormValues, 'ingredients'>
}

export const AddNoteModal = ({
  children,
  index,
  updateIngredient,
}: AddNoteModalProps) => {
  const form = useFormContext()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
  )
}
