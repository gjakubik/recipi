'use client'

import React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  IngredientFormValues,
  ingredientFormSchema,
} from '@/lib/validations/ingredient'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { FormInput } from '@/components/FormInput'
import { AddPortionModal } from '../modals/AddPortionModal'
import { Edit2, Plus } from 'lucide-react'
import upsertIngredient from '@/lib/db/api/ingredient/upsertIngredient'

interface IngredientFormProps {
  initialValues?: IngredientFormValues & {
    fdc_id?: string
    description?: string
    calories?: string
    protein?: string
    fat?: string
    carbs?: string
    portions?: [
      {
        unit: string
        abbreviation: string
        value: string
        gram_weight: string
        gram_per_unit: string
      },
    ]
    processed?: boolean
  }
}

export const IngredientForm = ({ initialValues }: IngredientFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      fdc_id: '',
      description: '',
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      portions: [
        {
          unit: '',
          abbreviation: '',
          value: '',
          gram_weight: '',
          gram_per_unit: '',
        },
      ],
      processed: false,
    },
  })

  const onFormSubmit = async (data: IngredientFormValues) => {
    const prepIngredient = {
      id: '',
      fdc_id: parseInt(data.fdc_id),
      description: data.description ? data.description : '',
      calories: parseFloat(data.calories),
      protein: parseFloat(data.protein),
      fat: parseFloat(data.fat),
      carbs: parseFloat(data.carbs),
      portions: data.portions.map((portion) => ({
        unit: portion.unit ? portion.unit : '',
        abbreviation: portion.abbreviation ? portion.abbreviation : '',
        value: parseFloat(portion.value) ? parseFloat(portion.value) : 0,
        gram_weight: parseFloat(portion.gram_weight)
          ? parseFloat(portion.gram_weight)
          : 0,
        gram_per_unit: parseFloat(portion.gram_per_unit)
          ? parseFloat(portion.gram_per_unit)
          : 0,
      })),
    }

    try {
      const upsertedIngredient = await upsertIngredient(prepIngredient)
      if (!upsertedIngredient) {
        toast({
          title: `Error ${initialValues} creating ingredient`,
          description: `Something went wrong:
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
      form.reset()
      router.refresh()
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
            name="fdc_id"
            label="FDC ID"
            type="string"
            className="w-[80px]"
            placeholder="0"
          />
          <FormInput
            name="description"
            label="Description"
            type="string"
            placeholder="Ingredient Description"
          />
          <FormInput
            name="calories"
            label="Calories"
            type="string"
            className="w-[80px]"
            placeholder="0.0"
          />
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
          <div className="flex flex-row items-end gap-2">
            <AddPortionModal>
              {form.formState.dirtyFields.portions ? (
                <Button
                  variant="outline"
                  className="flex flex-row items-center gap-1"
                >
                  <Edit2 width={15} className="mb-px" />
                  Edit Portions
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="flex flex-row items-center gap-1"
                >
                  <Plus width={15} className="mb-px" />
                  Add Portions
                </Button>
              )}
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
