'use client'

import React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createIngredient, updateIngredient } from '@/lib/db/api'
import {
  IngredientFormValues,
  ingredientFormSchema,
  PortionFormValues,
  portionFormSchema,
} from '@/lib/validations/ingredient'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { FormInput } from '@/components/FormInput'
import { PlusIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { AddPortionModal } from '../modals/AddPortionModal'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AddUnitModal } from '@/components/modals/AddUnitModal'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Plus } from 'lucide-react'

interface PortionFormProps {
  initialValues?: PortionFormValues & {
    unit?: string
    abbreviation: string
    value: string
    gram_weight: string
    gram_per_unit: string
  }
}

export const PortionForm = ({ initialValues }: PortionFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<PortionFormValues>({
    resolver: zodResolver(portionFormSchema),
    defaultValues: !!initialValues
      ? {
          ...initialValues,
        }
      : {
          unit: '',
          abbreviation: '',
          value: '0',
          gram_weight: '0',
          gram_per_unit: '0',
        },
  })

  const onFormSubmit = async (data: PortionFormValues) => {
    const prepPortion = {
      unit: data.unit,
      abbreviation: data.abbreviation,
      value: parseFloat(data.value),
      gram_weight: parseFloat(data.gram_weight),
      gram_per_unit: parseFloat(data.gram_per_unit),
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex-col space-y-8"
      >
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
    </Form>
  )
}
