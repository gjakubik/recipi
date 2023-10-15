'use client'

import { useEffect, useState, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Typography } from '@/components/ui/typography'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { EditPreviewTabs } from '@/components/EditPreviewTabs'
import { FormInput } from '@/components/FormInput'
import { TimeInput } from '@/components/TimeInput'
import { EditIngredientItem } from '@/components/EditIngredientItem'
import { MainNav } from '@/components/MainNav'
import { PlusIcon } from '@radix-ui/react-icons'
import { EditInstructionItem } from '@/components/EditInstructionItem'
import { createRecipe } from '@/lib/db/api'

interface Ingredient {
  id: string
  name: string
  note: string
  amount: string
  unit: string
}
// Create a form using react-hook-form and zodResolver
const recipeFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  preparationTime: z.string(),
  cookingTime: z.string(),
  servings: z.string(),
  difficultyLevel: z.enum(['easy', 'medium', 'hard']),
  instructions: z.array(z.object({ id: z.string(), instruction: z.string() })),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      note: z.string().optional(),
      amount: z.string(),
      unit: z.string(),
    })
  ),
  categories: z.array(z.string()),
})

const CreateRecipePage = () => {
  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      preparationTime: '30-min',
      cookingTime: '30-min',
      servings: '',
      difficultyLevel: 'easy',
      instructions: [{ id: 'temp-0', instruction: '' }],
      ingredients: [{ id: 'temp-0', name: '', note: '', amount: '', unit: '' }],
      categories: [''],
    },
  })
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
    move: moveIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const {
    fields: instructions,
    append: appendInstruction,
    remove: removeInstruction,
    move: moveInstruction,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
  })

  const onSubmit = async (data: z.infer<typeof recipeFormSchema>) => {
    console.log('calling submit')
    const newRecipe = await createRecipe({
      ...data,
      servings: parseInt(data.servings),
      instructions: data.instructions
        .map((i) => `<instruction>${i.instruction}</instruction>`)
        .join(''),
      ingredients: data.ingredients.map((i) => ({
        ...i,
        id: undefined,
      })),
    })
    console.log(newRecipe)
    form.reset()
  }

  const handleAddIngredient = () =>
    appendIngredient({
      id: `temp-${ingredients.length}`,
      name: '',
      note: '',
      amount: '',
      unit: '',
    })

  const handleAddInstruction = () =>
    appendInstruction({ id: `temp-${instructions.length}`, instruction: '' })

  // TODO: Combine these functions into one
  const handleIngredientDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = ingredients.findIndex((i) => i.id === active.id)
      const newIndex = ingredients.findIndex((i) => i.id === over?.id)
      oldIndex !== -1 && newIndex !== -1 && moveIngredient(oldIndex, newIndex)
    }
  }

  const handleInstructionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = instructions.findIndex((i) => i.id === active.id)
      const newIndex = instructions.findIndex((i) => i.id === over?.id)
      oldIndex !== -1 && newIndex !== -1 && moveInstruction(oldIndex, newIndex)
    }
  }
  return (
    <>
      <Typography variant="h2">Create Recipe</Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col space-y-8"
        >
          <div className="flex flex-col gap-2">
            <FormInput
              name="title"
              label="Title"
              placeholder="Title your recipe..."
            />
            <FormInput
              name="description"
              label="Description"
              placeholder="Describe your recipe..."
            />
            <div className="flex flex-wrap flex-row gap-2 justify-between">
              <div className="flex flex-row gap-2">
                <TimeInput name="preparationTime" />
                <TimeInput name="cookingTime" />
              </div>
              <div className="flex flex-row gap-2">
                <FormInput
                  name="servings"
                  label="Servings"
                  type="number"
                  className="w-[80px]"
                  placeholder="0"
                />
                <FormField
                  control={form.control}
                  name="difficultyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Difficulty Level</SelectLabel>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <EditPreviewTabs title="Ingredients">
            <TabsContent value="edit">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleIngredientDragEnd}
              >
                <SortableContext
                  items={ingredients.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-row justify-between items-end mt-4 max-w-[600px] m-auto">
                    <div className="flex flex-row items-end w-[400px]">
                      <div className="w-[40px]" />
                      <FormLabel>Name</FormLabel>
                    </div>
                    <div className="flex flex-row items-end gap-1">
                      <div className="w-[80px]">
                        <FormLabel>Amount</FormLabel>
                      </div>
                      <div className="w-[100px]">
                        <FormLabel>Unit</FormLabel>
                      </div>
                      <div className="w-[30px]" />
                    </div>
                  </div>
                  {ingredients.map((i, index) => (
                    <EditIngredientItem
                      key={i.id}
                      index={index}
                      id={i.id}
                      onDelete={(id) =>
                        removeIngredient(
                          ingredients.findIndex((i) => i.id === id)
                        )
                      }
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <div className="flex flex-row justify-end w-full max-w-[600px] m-auto">
                <Button
                  variant="default"
                  onClick={handleAddIngredient}
                  className="mt-4"
                  type="button"
                >
                  <PlusIcon /> Add
                </Button>
              </div>
            </TabsContent>
          </EditPreviewTabs>
          <EditPreviewTabs title="Instructions">
            <TabsContent value="edit" className="flex flex-col gap-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleInstructionDragEnd}
              >
                <SortableContext
                  items={instructions.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {instructions.map((i, index) => (
                    <EditInstructionItem
                      key={i.id}
                      index={index}
                      id={i.id}
                      onDelete={(id) =>
                        removeInstruction(
                          instructions.findIndex((i) => i.id === id)
                        )
                      }
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <div className="flex justify-end">
                <Button
                  className="mt-4"
                  onClick={handleAddInstruction}
                  type="button"
                >
                  <PlusIcon /> Add
                </Button>
              </div>
            </TabsContent>
          </EditPreviewTabs>
          <div className="flex flex-row space-x-4">
            <Button type="submit">Submit</Button>
            <Button variant="ghost" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CreateRecipePage
