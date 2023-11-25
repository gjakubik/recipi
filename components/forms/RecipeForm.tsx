'use client'

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
import Image from 'next/image'
import { UploadDropzone } from '@uploadthing/react'
import { UploadThingFileRouter } from '@/app/api/uploadthing/core'
import { createRecipe, updateRecipe } from '@/lib/db/api'
import { RecipeFormValues, recipeFormSchema } from '@/lib/validations/recipe'

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
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { EditPreviewTabs } from '@/components/EditPreviewTabs'
import { FormInput } from '@/components/FormInput'
import { TimeInput } from '@/components/TimeInput'
import { EditIngredientItem } from '@/components/EditIngredientItem'
import { IngredientsList } from '../IngredientsList'
import { PlusIcon } from '@radix-ui/react-icons'
import { EditInstructionItem } from '@/components/EditInstructionItem'
import { InstructionsList } from '../InstructoinsList'
import { FancyBox } from '@/components/FancyBox'
import { FancyMultiSelect } from '@/components/FancyMultiSelect'

interface RecipeFormProps {
  initialValues?: RecipeFormValues & { id?: number }
  user: User & { id: string }
}

export const RecipeForm = ({ initialValues, user }: RecipeFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      preparationTime: '30-min',
      cookingTime: '30-min',
      servings: '',
      difficultyLevel: 'easy',
      instructions: [{ id: 0, instruction: '' }],
      ingredients: [{ id: 0, name: '', note: '', amount: '', unit: '' }],
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

  const titleImage = form.getValues('titleImage')

  const onFormSubmit = async (data: RecipeFormValues) => {
    console.log('calling submit')
    const prepRecipe = {
      ...data,
      instructions: data.instructions?.map((i) => i.instruction),
    }

    try {
      const upsertedRecipe = initialValues
        ? await updateRecipe(prepRecipe)
        : await createRecipe({
            ...prepRecipe,
            authorId: user.id,
            ingredients: data.ingredients.map((i) => ({
              ...i,
              id: undefined,
            })),
          })
      toast({
        title: `Recipe ${upsertedRecipe.id} ${
          initialValues ? 'updated' : 'created'
        }`,
        description: `${upsertedRecipe.title} has been ${
          initialValues ? 'updated' : 'created'
        }`,
      })
      router.refresh()
      router.push(`/recipe/${upsertedRecipe.id}`)
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
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex flex-col gap-2 flex-grow">
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
              {!titleImage ? (
                <UploadDropzone<UploadThingFileRouter>
                  className="drop-shadow-md h-max-content"
                  endpoint="titleImage"
                  onClientUploadComplete={(res) => {
                    console.log(res)
                    if (!res) {
                      toast({
                        title: 'Error uploading image',
                        description: 'Something went wrong',
                      })
                      return
                    }
                    console.log(res[0])
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
                  <Image
                    src={titleImage.url || '/images/placeholder.png'}
                    alt="Recipe title image"
                    fill
                    className="object-cover rounded-md"
                    loading="lazy"
                  />
                </AspectRatio>
              )}
            </div>
          </div>
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
              <Typography className="text-center py-12">
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
                <div className=" w-full max-w-[600px] m-auto">
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
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex justify-end w-full max-w-[600px] m-auto">
              <Button
                className="mt-4"
                onClick={handleAddInstruction}
                type="button"
              >
                <PlusIcon /> Add
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            {instructions.length > 0 && instructions[0].instruction ? (
              <InstructionsList
                instructions={instructions.map((i) => i.instruction)}
              />
            ) : (
              <Typography className="text-center py-12">
                No instructions added
              </Typography>
            )}
          </TabsContent>
        </EditPreviewTabs>
        <FancyBox />
        <FancyMultiSelect />
        <div className="flex flex-row space-x-4">
          <Button type="submit">{initialValues ? 'Save' : 'Submit'}</Button>
          <Button variant="ghost" type="reset">
            {initialValues ? 'Reset' : 'Clear'}
          </Button>
        </div>
      </form>
    </Form>
  )
}