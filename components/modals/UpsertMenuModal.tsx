'use client'

import { PropsWithChildren, useState } from 'react'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import _ from 'lodash'
import { useForm, UseFormSetValue } from 'react-hook-form'
import { MenuFormValues, menuFormSchema } from '@/lib/validations/menu'
import { zodResolver } from '@hookform/resolvers/zod'
import { createMenu, updateMenu } from '@/lib/db/api'

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
import { Recipe } from '@/types'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { FormInput } from '@/components/FormInput'
import serverRevalidatePath from '@/app/_actions/revalidateAction'

interface UpsertMenuModalProps extends PropsWithChildren {
  existingMenu?: MenuFormValues
  newRecipe?: Recipe
  user: User
}

export const UpsertMenuModal = ({
  children,
  existingMenu,
  newRecipe,
  user,
}: UpsertMenuModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: !!existingMenu
      ? {
          ...existingMenu,
          recipes: newRecipe
            ? [...(existingMenu.recipes || []), newRecipe?.id]
            : existingMenu.recipes,
        }
      : {
          title: '',
          description: '',
          recipes: newRecipe ? [newRecipe?.id] : undefined,
          authorId: user.id,
        },
  })

  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onFormSubmit = async (menu: MenuFormValues) => {
    console.log('menu', menu)
    setIsSaving(true)
    try {
      const upsertedRecipe = existingMenu
        ? await updateMenu(menu)
        : await createMenu(menu)

      console.log('upsertedRecipe', upsertedRecipe)
      if (!upsertedRecipe) {
        throw new Error('Something went wrong')
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
    toast({
      title: 'Success',
      description: 'Menu saved successfully',
    })
    serverRevalidatePath(window.location.pathname)
    setIsSaving(false)
    setSubmitted(true)
    setOpen(false)
    // clear cache at 'my-menus' page
  }

  const closeDialog = () => {
    setOpen(false)
    setSubmitted(false)
  }

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
        }
        setOpen(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a Menu</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Create a collection of recipes. This is great for holidays, events,
          and meal planning! Just add recipes from wherever you see them. Share
          menus with others and generate shopping lists with just a click!
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="flex flex-col space-y-4 w-full"
          >
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter a title..."
              className="w-full"
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...field}
                    placeholder="Enter a description..."
                    className="w-full"
                  />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              {form.getValues('recipes')?.map((recipeId, i) => (
                <Typography key={i}>
                  {recipeId === newRecipe?.id
                    ? newRecipe?.title
                    : 'Recipe title'}
                </Typography>
              ))}
            </div>
            <div className="flex flex-row gap-2">
              {submitted ? (
                <Button onClick={closeDialog}>Close</Button>
              ) : (
                <Button type="submit" disabled={isSaving}>
                  {existingMenu ? 'Save' : 'Create'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
