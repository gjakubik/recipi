'use client'

import { PropsWithChildren, useState } from 'react'
import _ from 'lodash'
import { Form } from '@/components/ui/form'

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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { IngredientFormValues } from '@/lib/validations/ingredient'

interface AddPortionModalProps extends PropsWithChildren {
  index: number
}

export const AddPortionModal = ({ children, index }: AddPortionModalProps) => {
  const form = useFormContext()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Portion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter portion data for this ingredient
        </DialogDescription>
        <form className="flex-col space-y-8">
          <div className="flex flex-row flex-wrap items-end gap-2">
            <FormInput
              name={`portions[${index}].unit`}
              label="Unit"
              type="string"
              className="w-[80px]"
              placeholder="Cups"
            />
            <FormInput
              name={`portions[${index}].abbreviation`}
              label="Abbreviation"
              type="string"
              className="w-[80px]"
              placeholder="0"
            />
            <FormInput
              name={`portions[${index}].value`}
              label="Value"
              type="string"
              className="w-[80px]"
              placeholder="0.0"
            />
            <FormInput
              name={`portions[${index}].gram_weight`}
              label="Gram Weight"
              type="string"
              className="w-[80px]"
              placeholder="0.0"
            />
            <FormInput
              name={`portions[${index}].gram_per_unit`}
              label="Grams per Unit"
              type="string"
              className="w-[80px]"
              placeholder="0.0"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                console.log(form.getValues())
                form.setValue(`portions`, [
                  ...form.getValues(`portions`),
                  {
                    unit: form.getValues(`portions.${index}.unit`),
                    abbreviation: form.getValues(
                      `portions.${index}.abbreviation`
                    ),
                    value: form.getValues(`portions.${index}.value`),
                    gram_weight: form.getValues(
                      `portions.${index}.gram_weight`
                    ),
                    gram_per_unit: form.getValues(
                      `portions.${index}.gram_per_unit`
                    ),
                  },
                ])
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
