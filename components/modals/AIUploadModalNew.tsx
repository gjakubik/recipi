'use client'

import { PropsWithChildren, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { useToast } from '@/components/ui/use-toast'
import { abbToUnit } from '@/lib/utils'
import { recipeAIUploadText } from '@/app/_actions/recipeAIUpload'

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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Ingredient } from '@/types'

export const AIUploadModalNew = ({ children }: PropsWithChildren) => {
  const form = useFormContext()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsSaving(true)
    let data
    try {
      const res = await recipeAIUploadText(input)
      if (!res) {
        toast({
          title: 'AI Upload Error',
          description:
            'There was an error processing your recipe, try again or enter manually',
        })
        setIsSaving(false)
        return
      }
      data = JSON.parse(res)
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'Invalid JSON',
        variant: 'destructive',
      })
      setIsSaving(false)
      return
    }

    try {
      data.title && form.setValue('title', data.title)
      data.description && form.setValue('description', data.description)
      data.difficultyLevel &&
        form.setValue('difficultyLevel', _.lowerCase(data.difficultyLevel))
      data.servings && form.setValue('servings', data.servings)
      data.preparationTime &&
        form.setValue('preparationTime', data.preparationTime)
      data.cookingTime && form.setValue('cookingTime', data.cookingTime)
      data.ingredients &&
        form.setValue(
          'ingredients',
          data.ingredients.map((ing: Ingredient, i: number) => {
            //if we are able to parse the amount, use that, otherwise leave it empty. If the unit is empty, then set it to the amount
            const validAmount = parseFloat(ing.amount || '') > 0
            const amount = validAmount ? parseFloat(ing.amount || '') : ''
            // if the amount is invalid and there is no unit, then set the unit to amount
            const unit = abbToUnit(
              _.trimEnd(!validAmount && !ing.unit ? ing.amount : ing.unit, 's')
            )
            return {
              ...ing,
              id: i,
              amount,
              unit,
            }
          })
        )
      data.instructions &&
        form.setValue(
          'instructions',
          data.instructions.map((ins: string, i: number) => ({
            id: i,
            instruction: ins,
          }))
        )
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: 'Invalid JSON',
        variant: 'destructive',
      })
      setIsSaving(false)
      return
    }

    setIsSaving(false)
    setSuccess(true)
    setOpen(false)
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen} defaultOpen={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[700px]">
        <DialogHeader>
          <DialogTitle>AI Upload</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Use AI to prefill your recipe from an image or text
        </DialogDescription>
        <div className="flex flex-col gap-2">
          <Typography variant="p">Paste the recipe text here:</Typography>
          <Textarea
            placeholder="Recipe text goes here... (messy formatting is ok)"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={15}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={onSave}
            disabled={isSaving || !input || success}
            className={
              isSaving
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary-700'
            }
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
