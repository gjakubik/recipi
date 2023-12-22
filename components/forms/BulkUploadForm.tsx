'use client'

import React from 'react'
import _ from 'lodash'
import { User } from 'next-auth'
import { ZodError } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createRecipe } from '@/lib/db/api'
import {
  bulkRecipeFormSchema,
  bulkRecipeJsonSchema,
  BulkRecipeFormValues,
} from '@/lib/validations/bulkRecipe'

import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface BulkUploadFormProps {
  user: User & { id: string }
}

export const BulkUploadForm = ({ user }: BulkUploadFormProps) => {
  const { toast } = useToast()
  const form = useForm<BulkRecipeFormValues>({
    resolver: zodResolver(bulkRecipeFormSchema),
    mode: 'onSubmit',
  })
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [progress, setProgress] = React.useState<number>(0)

  const onFormSubmit = async (data: BulkRecipeFormValues) => {
    setIsUploading(true)
    let json
    let recipes
    // Load the json
    try {
      json = JSON.parse(data.recipeList)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Invalid JSON',
        variant: 'destructive',
      })
      return
    }
    // Validate and coerce json into correct format
    try {
      recipes = bulkRecipeJsonSchema.parse(json)
    } catch (err) {
      if (err instanceof ZodError) {
        toast({
          title: 'Error',
          description: (
            <ul>
              {err.issues.map((issue, idx) => {
                return (
                  <li key={idx}>{`${
                    issue.message
                  } at recipe number ${issue.path.join(', ')}`}</li>
                )
              })}
            </ul>
          ),
          variant: 'destructive',
        })
      }
      return
    }

    // Create the recipes
    try {
      recipes.forEach(async (recipe, i) => {
        const withAuthor = {
          ...recipe,
          authorId: user.id,
          difficultyLevel: _.toLower(recipe.difficultyLevel),
        }
        await createRecipe(withAuthor)
        const progress = (100 / recipes.length) * (i + 1)
        setProgress(progress)
      })
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'Error creating recipes',
        variant: 'destructive',
      })
      return
    }

    setIsUploading(false)
    toast({
      title: 'Success',
      description: 'Recipes created successfully',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="recipeList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe List (JSON)</FormLabel>
              <Textarea
                {...field}
                placeholder="Paste your list of recipes in json format here..."
                className="w-full"
                rows={25}
              />
            </FormItem>
          )}
        />
        {isUploading && <Progress value={progress} className="w-full" />}
        <div>
          <Button type="submit" disabled={isUploading}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
