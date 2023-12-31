'use client'

import { PropsWithChildren, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { useToast } from '@/components/ui/use-toast'
import { abbToUnit } from '@/lib/utils'

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
import { Typography } from '../ui/typography'
import { Ingredient } from '@/types'

export const AIUploadModal = ({ children }: PropsWithChildren) => {
  const form = useFormContext()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [inputJSON, setInputJSON] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsSaving(true)
    console.log(inputJSON)
    let data
    try {
      data = JSON.parse(inputJSON)
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
            return {
              ...ing,
              id: i,
              unit: abbToUnit(_.trimEnd(ing.unit, 's')),
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
          Use ChatGPT to prefill your recipe from an image or text
        </DialogDescription>
        <div className="flex flex-col gap-2">
          <Typography variant="p">
            Upload an image or text to the <strong>Recipe Converter GPT</strong>{' '}
            here:
          </Typography>
          <a
            href="https://chat.openai.com/g/g-0y8Fagkla-recipe-converter-gpt"
            target="_blank"
            className="text-primary-500 hover:underline"
          >
            https://chat.openai.com/g/g-0y8Fagkla-recipe-converter-gpt
          </a>
          <Typography variant="p">
            Copy the JSON from the AI and paste it here:
          </Typography>
          <Textarea
            placeholder="Paste AI generated JSON here..."
            className="w-full"
            value={inputJSON}
            onChange={(e) => setInputJSON(e.target.value)}
            rows={15}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            onClick={onSave}
            disabled={isSaving || !inputJSON || success}
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
