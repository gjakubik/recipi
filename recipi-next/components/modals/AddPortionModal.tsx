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
  let new_portion = {
    unit: '',
    abbreviation: '',
    value: '0',
    gram_weight: '0',
    gram_per_unit: '0',
  }

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
