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

interface IngredientFormProps {
  initialValues?: IngredientFormValues & {
    id?: string
    fdc_id?: string
    description?: string
    calories?: string
    protein?: string
    fat?: string
    carbs?: string
    poritions?: []
    processed?: boolean
  }
}

const [customPortionOptions, setCustomPortionOptions] = React.useState<
  string[]
>([])
const addCustomPortion = (
  unit: string,
  abbreviation: string,
  value: string,
  setGramWeight: string,
  gramsPerUnit: string
) => {
  setCustomPortionOptions([
    ...customPortionOptions,
    `${unit}, ${abbreviation}, ${value}, ${setGramWeight}, ${gramsPerUnit}`,
  ])
}

export const IngredientForm = ({ initialValues }: IngredientFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: !!initialValues
      ? {
          ...initialValues,
        }
      : {
          id: '0',
          fdc_id: '0',
          description: '',
          calories: '0.0',
          protein: '0.0',
          fat: '0.0',
          carbs: '0.0',
          portions: [{}],
          processed: false,
        },
  })

  const onFormSubmit = async (data: IngredientFormValues) => {
    const prepIngredient = {
      id: data.id,
      fdc_id: parseInt(data.fdc_id),
      description: data.description,
      calories: parseFloat(data.calories),
      protein: parseFloat(data.protein),
      fat: parseFloat(data.fat),
      carbs: parseFloat(data.carbs),
      portions: data.portions,
    }

    try {
      const upsertedIngredient = initialValues
        ? await updateIngredient(prepIngredient)
        : await createIngredient(prepIngredient)
      if (!upsertedIngredient) {
        toast({
          title: `Error ${initialValues} creating ingredient`,
          description: `Something went wrong:
            ${prepIngredient.id}, 
            ${prepIngredient.fdc_id}
            ${prepIngredient.description},
            ${prepIngredient.calories},
            ${prepIngredient.protein}, 
            ${prepIngredient.fat}, 
            ${prepIngredient.carbs},
            ${prepIngredient.portions},`,
        })
        return
      }

      toast({
        title: `Ingredient ${upsertedIngredient.id}
            ${upsertedIngredient.description} created`,
      })
      router.refresh()
      // Go to previous page
      router.back()
    } catch (error) {
      toast({
        title: `Error ${initialValues} creating ingredient`,
        description: 'Something went wrong',
      })
      console.log(error)
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
            name="id"
            label="ID"
            type="string"
            className="w-[80px]"
            placeholder="0"
          />
          <FormInput
            name="fdc_id"
            label="FDC ID"
            type="string"
            className="w-[80px]"
            placeholder="0"
          />
          <FormInput name="description" label="Description" type="string" />
          <FormInput
            name="protein"
            label="Protein"
            type="string"
            className="w-[80px]"
            placeholder="0.0"
          />
          <FormInput
            name="fat"
            label="Fat"
            type="string"
            className="w-[80px]"
            placeholder="0.0"
          />
          <FormInput
            name="carbs"
            label="Carbs"
            type="string"
            className="w-[80px]"
            placeholder="0.0"
          />
          <FormInput
            name="calories"
            label="Calories"
            type="string"
            className="w-[80px]"
            placeholder="0.0"
          />
          <div className="flex flex-row items-end gap-2">
            <AddPortionModal addCustomPortion={addCustomPortion}>
              <Button
                variant="ghost"
                className="flex flex-row items-center gap-1"
              >
                <Plus width={15} className="mb-px" />
                Add Portion
              </Button>
            </AddPortionModal>
            <Button variant="ghost" type="reset" onClick={() => form.reset()}>
              {initialValues ? 'Reset' : 'Clear'}
            </Button>
            <Button type="submit">{initialValues ? 'Save' : 'Create'}</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
