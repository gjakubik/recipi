'use client'

import React, { useMemo } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { UploadDropzone } from '@uploadthing/react'
import { UploadThingFileRouter } from '@/app/api/uploadthing/core'
import { createRecipe, updateRecipe } from '@/lib/db/api'
import { RecipeFormValues, recipeFormSchema } from '@/lib/validations/recipe'
import { UNITS } from '@/lib/constants'
import { abbToUnit } from '@/lib/utils'
import { useFeatureFlags } from '@/hooks/use-feature-flags'
import { IngredientSearchBar } from '@/components/recipe/IngredientSearchBar'

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { TimePicker } from '@/components/ui/time-picker'
import { EditPreviewTabs } from '@/components/EditPreviewTabs'
import { FormInput } from '@/components/FormInput'
import { DeleteRecipeConfirmation } from '@/components/modals/DeleteRecipeConfirmation'
import { EditIngredientItem } from '@/components/recipe/EditIngredientItem'
import { IngredientsList } from '@/components/recipe/IngredientsList'
import { EditInstructionItem } from '@/components/recipe/EditInstructionItem'
import { AIUploadModalNew } from '@/components/modals/AIUploadModalNew'
import { AIUploadModal } from '@/components/modals/AIUploadModal'
import { InstructionsList } from '@/components/recipe/InstructionsList'
import { PlusIcon } from '@radix-ui/react-icons'

interface RecipeFormProps {
  initialValues?: RecipeFormValues & { id?: number }
  user: User & { id: string }
}

export const RecipeForm = ({ initialValues, user }: RecipeFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { canSeeNewAIRecipeUpload } = useFeatureFlags()
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: !!initialValues
      ? {
          ...initialValues,
          difficultyLevel: _.lowerCase(initialValues?.difficultyLevel),
        }
      : {
          title: '',
          description: '',
          preparationTime: '000:00:00',
          cookingTime: '000:00:00',
          servings: '',
          difficultyLevel: 'easy',
          instructions: [{ id: 0, instruction: '' }],
          ingredients: [{ id: 0, name: '', note: '', amount: '', unit: '' }],
          authorId: user.id,
        },
  })

  console.log('formValues', form.getValues())

  const [customUnitOptions, setCustomUnitOptions] = React.useState<string[]>([])

  const addCustomUnit = (unit: string) => {
    setCustomUnitOptions([unit, ...customUnitOptions])
  }

  // calculate unit options based on UNIT_OPTIONS + [{ label: 'unit', value: 'unit' } for each ingredient unit]
  const unitOptions = useMemo(() => {
    const unitOptions = UNITS
    const ingunits = form.getValues('ingredients')
    const ingredientUnits = ingunits
      .map((i) => i.unit)
      .filter((u) => !!u)
      .map(abbToUnit)
      .map((u) => _.capitalize(u))
    const uniqueIngredientUnits = _.uniq(
      ingredientUnits.concat(customUnitOptions)
    )
    uniqueIngredientUnits.forEach((unit) => {
      if (!unitOptions.find((u) => u === unit)) {
        unitOptions.unshift(unit)
      }
    })
    return unitOptions
  }, [form.getValues('ingredients'), customUnitOptions])

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
    update: updateIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const {
    fields: instructions,
    append: appendInstruction,
    remove: removeInstruction,
    move: moveInstruction,
    update: updateInstruction,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
  })

  const onFormSubmit = async (data: RecipeFormValues) => {
    const prepRecipe = {
      ...data,
      instructions: data.instructions?.map((i) => i.instruction) || [],
    }

    try {
      const upsertedRecipe = initialValues
        ? await updateRecipe(prepRecipe)
        : await createRecipe(prepRecipe)
      if (!upsertedRecipe) {
        toast({
          title: `Error ${initialValues ? 'updating' : 'creating'} recipe`,
          description: 'Something went wrong',
        })
        return
      }

      toast({
        title: `Recipe ${upsertedRecipe.id} ${
          initialValues ? 'updated' : 'created'
        }`,
        description: `${upsertedRecipe.title} has been ${
          initialValues ? 'updated' : 'created'
        }`,
      })
      router.refresh()
      // Go to previous page
      router.back()
    } catch (error) {
      toast({
        title: `Error ${initialValues ? 'updating' : 'creating'} recipe`,
        description: 'Something went wrong',
      })
      console.log(error)
    }
  }

  const handleAddIngredient = () =>
    appendIngredient({
      id: ingredients.length,
      name: '',
      note: '',
      amount: '',
      unit: '',
    })

  const handleAddInstruction = () =>
    appendInstruction({ id: instructions.length, instruction: '' })

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex-col space-y-8"
      >
        {!initialValues && (
          <Alert>
            <AlertTitle>AI Upload</AlertTitle>
            <AlertDescription className="flex w-full flex-col items-center justify-between gap-4 xs:flex-row">
              <Typography>
                Use ChatGPT to prefill your recipe from an image or text
              </Typography>
              {canSeeNewAIRecipeUpload ? (
                <AIUploadModalNew>
                  <Button className="min-w-[100px]">AI Upload</Button>
                </AIUploadModalNew>
              ) : (
                <AIUploadModal>
                  <Button className="min-w-[100px]">AI Upload</Button>
                </AIUploadModal>
              )}
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex flex-grow flex-col gap-2">
              <FormInput
                name="title"
                label="Title"
                placeholder="Title your recipe..."
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Add a description..."
                      className="w-full"
                      rows={6}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex h-full w-full sm:w-[300px]">
              <FormField
                control={form.control}
                name="titleImage"
                render={({ field }) => (
                  <>
                    {!field.value ? (
                      <UploadDropzone<UploadThingFileRouter, 'titleImage'>
                        className="h-[246px] drop-shadow-md"
                        appearance={{
                          container: 'rounded-3xl',
                          label: 'text-primary hover:text-slate-500',
                          allowedContent: 'text-slate-400',
                          button:
                            'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:pointer-cursor rounded-md px-3 text-sm',
                        }}
                        endpoint="titleImage"
                        onClientUploadComplete={(res) => {
                          if (!res) {
                            toast({
                              title: 'Error uploading image',
                              description: 'Something went wrong',
                            })
                            return
                          }
                          form.setValue('titleImage', res[0])
                          toast({
                            title: 'Image uploaded',
                            description: 'Image uploaded successfully',
                          })
                        }}
                        onUploadError={(err: Error) => {
                          console.log(err.message)
                          toast({
                            title: 'Error uploading image',
                            description: err.message,
                          })
                        }}
                      />
                    ) : (
                      <AspectRatio ratio={1 / 1}>
                        <img
                          src={field.value.url || '/images/placeholder.png'}
                          alt="Recipe title image"
                          className="fill rounded-md object-cover"
                          loading="lazy"
                        />
                      </AspectRatio>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-row flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-6 sm:flex-row">
              <FormField
                control={form.control}
                name="preparationTime"
                render={({ field }) => (
                  <TimePicker
                    label="Prep Time"
                    time={field.value}
                    setTime={(time: string): void => {
                      form.setValue('preparationTime', time)
                    }}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="cookingTime"
                render={({ field }) => (
                  <TimePicker
                    label="Cook Time"
                    time={field.value}
                    setTime={(time: string): void => {
                      form.setValue('cookingTime', time)
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-row items-start gap-2">
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
          <TabsContent value="edit" className="pt-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleIngredientDragEnd}
            >
              <SortableContext
                items={ingredients.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
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
                    addCustomUnit={addCustomUnit}
                    hasNote={!!i.note}
                    updateIngredient={updateIngredient}
                    units={unitOptions}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div className="m-auto flex w-full max-w-[600px] flex-row justify-end">
              <Button
                variant="secondary"
                onClick={handleAddIngredient}
                className="mt-4 flex gap-1"
                type="button"
              >
                <PlusIcon /> Ingredient
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            {ingredients.length > 0 && ingredients[0].name ? (
              <IngredientsList
                ingredients={ingredients.map((i) => ({
                  name: i.name,
                  note: i.note,
                  amount: i.amount,
                  unit: i.unit,
                }))}
              />
            ) : (
              <Typography className="py-12 text-center">
                No ingredients added
              </Typography>
            )}
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
                <div className=" m-auto w-full max-w-[600px]">
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
                      updateInstruction={updateInstruction}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className="m-auto flex w-full max-w-[600px] justify-end">
              <Button
                variant="secondary"
                className="mt-4 flex gap-1"
                onClick={handleAddInstruction}
                type="button"
              >
                <PlusIcon /> Instruction
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            {instructions.length > 0 && instructions[0].instruction ? (
              <InstructionsList
                instructions={instructions.map((i) => i.instruction)}
              />
            ) : (
              <Typography className="py-12 text-center">
                No instructions added
              </Typography>
            )}
          </TabsContent>
        </EditPreviewTabs>
        {/* <FancyBox />
        <FancyMultiSelect /> */}
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Button variant="ghost" type="reset" onClick={() => form.reset()}>
              {initialValues ? 'Reset' : 'Clear'}
            </Button>
            <Button type="submit">{initialValues ? 'Save' : 'Create'}</Button>
          </div>
          {initialValues?.id && (
            <DeleteRecipeConfirmation recipeId={initialValues.id}>
              <Button variant="destructive">Delete</Button>
            </DeleteRecipeConfirmation>
          )}
        </div>
      </form>
    </Form>
  )
}
