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
import { useFormContext } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'

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
          {form.getValues('portions').map((p: {}, i: number) => (
            <div className="flex flex-row flex-wrap items-end gap-2">
              <FormInput
                name={`portions[${i}].unit`}
                label={i == 0 ? 'Unit' : ''}
                type="string"
                className="w-[80px]"
                placeholder="Cups"
              />
              <FormInput
                name={`portions[${i}].abbreviation`}
                label={i == 0 ? 'Abbreviation' : ''}
                type="string"
                className="w-[80px]"
                placeholder="0"
              />
              <FormInput
                name={`portions[${i}].value`}
                label={i == 0 ? 'Value' : ''}
                type="string"
                className="w-[80px]"
                placeholder="0.0"
              />
              <FormInput
                name={`portions[${i}].gram_weight`}
                label={i == 0 ? 'Gram Weight' : ''}
                type="string"
                className="w-[80px]"
                placeholder="0.0"
              />
              <FormInput
                name={`portions[${i}].gram_per_unit`}
                label={i == 0 ? 'Grams per Unit' : ''}
                type="string"
                className="w-[80px]"
                placeholder="0.0"
              />
            </div>
          ))}
        </form>
        <DialogFooter>
          <Button variant="ghost" type="reset" onClick={() => form.reset()}>
            Clear
          </Button>
          <DialogClose asChild>
            <Button
              onClick={() => {
                form.setValue(`portions`, [
                  ...form.getValues().portions.map((portion: {}) => portion),
                  {
                    unit: '',
                    abbreviation: '',
                    value: '',
                    gram_weight: '',
                    gram_per_unit: '',
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
