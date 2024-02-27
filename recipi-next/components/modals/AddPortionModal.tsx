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
import { PortionForm } from '@/components/forms/PortionForm'
import { useRouter } from 'next/navigation'
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
          <div className="flex flex-row flex-wrap items-end gap-2">
            <FormInput
              name="unit"
              label="Unit"
              type="string"
              className="w-[80px]"
              placeholder="Cups"
            />
            <FormInput
              name="abbreviation"
              label="Abbreviation"
              type="string"
              className="w-[80px]"
              placeholder="0"
            />
            <FormInput
              name="value"
              label="Value"
              type="string"
              className="w-[80px]"
              placeholder="0.0"
            />
            <FormInput
              name="gram_weight"
              label="Gram Weight"
              type="string"
              className="w-[80px]"
              placeholder="0.0"
            />
            <FormInput
              name="gram_per_unit"
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
                console.log('form', form.getValues())
                form.setValue(`portions[${index}].unit`, form.getValues(`unit`))
                form.setValue(
                  `portions[${index}].abbreviation`,
                  form.getValues(`abbreviation`)
                )
                form.setValue(
                  `portions[${index}].value`,
                  form.getValues(`value`)
                )
                form.setValue(
                  `portions[${index}].gram_weight`,
                  form.getValues(`gram_weight`)
                )
                form.setValue(
                  `portions[${index}].gram_per_unit`,
                  form.getValues(`gram_per_unit`)
                )
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
