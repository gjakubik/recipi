'use client'

import { PropsWithChildren, useState } from 'react'

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
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { X } from 'lucide-react'

interface AddPortionModalProps extends PropsWithChildren {}

export const AddPortionModal = ({ children }: AddPortionModalProps) => {
  const form = useFormContext()

  const {
    fields: portions,
    append: addPortion,
    remove: removePortion,
    update: updatePortion,
  } = useFieldArray({
    control: form.control,
    name: 'portions',
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add a Portion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter portion data for this ingredient
        </DialogDescription>
        <div className="h-80">
          {portions.map((p, i) => (
            <div key={i} className="flex flex-row flex-wrap items-end gap-2">
              <FormInput
                name={`portions[${i}].unit`}
                label={i == 0 ? 'Unit' : ''}
                type="string"
                className="w-[80px]"
                placeholder="Cups"
              />
              <FormInput
                name={`portions.${i}.abbreviation`}
                label={i == 0 ? 'Abbreviation' : ''}
                type="string"
                className="w-[100px]"
                placeholder="c"
              />
              <FormInput
                name={`portions.${i}.value`}
                label={i == 0 ? 'Value' : ''}
                type="string"
                className="w-[80px]"
                placeholder="0.0"
              />
              <FormInput
                name={`portions.${i}.gram_weight`}
                label={i == 0 ? 'Gram Weight' : ''}
                type="string"
                className="w-[100px]"
                placeholder="0.0"
              />
              <FormInput
                name={`portions.${i}.gram_per_unit`}
                label={i == 0 ? 'Grams per Unit' : ''}
                type="string"
                className="w-[120px]"
                placeholder="0.0"
              />
              {i !== 0 && (
                <Button variant="ghost" onClick={() => removePortion(i)}>
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              addPortion({
                unit: '',
                abbreviation: '',
                value: '',
                gram_weight: '',
                gram_per_unit: '',
              })
            }}
          >
            Add Portion
          </Button>
          <Button variant="ghost" type="reset" onClick={() => form.reset()}>
            Clear
          </Button>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
