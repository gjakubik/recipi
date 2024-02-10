'use client'

import { PropsWithChildren, useState } from 'react'
import { Variants, motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { useToast } from '@/components/ui/use-toast'
import { abbToUnit } from '@/lib/utils'
import {
  recipeAIUploadText,
  recipeAIUploadImage,
} from '@/app/_actions/recipeAIUpload'
import { Ingredient } from '@/types'
import { UploadDropzone } from '@uploadthing/react'
import { UploadThingFileRouter } from '@/app/api/uploadthing/core'
import { UploadFileResponse } from 'uploadthing/client'

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
import { Bot } from 'lucide-react'

const robotVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1, 1.2, 1, 1.2, 1, 1], // Three pulses
    rotate: [0, 0, 0, 0, 0, 0, 0, 360], // Spin after pulses
    transition: {
      duration: 4, // Total duration of the entire sequence
      ease: 'easeInOut', // Easing function for the scaling
      times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1], // Timing for each transformation
      repeat: Infinity, // Repeat the sequence indefinitely
      repeatType: 'loop', // Ensures the animation loops from the start
    },
  },
}

export const AIUploadModalNew = ({ children }: PropsWithChildren) => {
  const form = useFormContext()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [image, setImage] = useState<UploadFileResponse | null>(null)
  const [inputJSON, setInputJSON] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('text')

  const onSaveText = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsSaving(true)
    let data
    try {
      const res = await recipeAIUploadText(textInput)
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
            const amount = validAmount ? ing.amount : ''
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
    setOpen(false)
  }

  const onSaveImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!image) return
    e.preventDefault()
    setIsSaving(true)
    let data
    try {
      const res = await recipeAIUploadImage(image)
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
            const amount = validAmount ? ing.amount : ''
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
    setOpen(false)
  }

  const onSavePersonal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsSaving(true)
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
          Use AI to prefill your recipe from an image or text.
        </DialogDescription>
        <div className="flex flex-row items-end gap-4">
          <Button
            onClick={() => setActiveTab('text')}
            variant="text"
            className={`px-2 pb-3 hover:cursor ${
              activeTab === 'text'
                ? 'font-bold long-dashed-border'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            Text
          </Button>
          <Button
            onClick={() => setActiveTab('image')}
            variant="text"
            className={`px-2 pb-3 hover:cursor ${
              activeTab === 'image'
                ? 'font-bold long-dashed-border'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            Image
          </Button>
          <Button
            onClick={() => setActiveTab('recipe-converter')}
            variant="text"
            className={`px-2 pb-3 hover:cursor ${
              activeTab === 'recipe-converter'
                ? 'font-bold long-dashed-border'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            ChatGPT
          </Button>
        </div>
        <div className="min-h-[450px] w-full max-w-[500px] m-auto">
          {activeTab === 'text' && (
            <div className="flex flex-col gap-2">
              <Typography variant="p">Paste the recipe text here:</Typography>
              <Textarea
                placeholder="Recipe text goes here... (messy formatting is ok)"
                className="w-full"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={19}
              />
              <div></div>
            </div>
          )}
          {activeTab === 'image' && (
            <div className="flex flex-col gap-2 relative">
              <Typography variant="p">Upload the recipe image here:</Typography>
              {!image && (
                <UploadDropzone<UploadThingFileRouter>
                  className="drop-shadow-md h-[400px]"
                  endpoint="titleImage"
                  onClientUploadComplete={(res) => {
                    if (!res) {
                      toast({
                        title: 'Error uploading image',
                        description: 'Something went wrong',
                      })
                      return
                    }
                    setImage(res[0])
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
              )}
              {image && (
                <img
                  src={image.url}
                  alt="Recipe"
                  className={`w-full h-[400px] object-cover rounded-md ${
                    isSaving ? 'grayscale brightness-50' : ''
                  }`}
                />
              )}
              {isSaving && (
                <motion.div
                  className="absolute inset-0 flex justify-center items-center"
                  variants={robotVariants}
                  initial={{ scale: 1, rotate: 0 }} // Start from a non-scaled, non-rotated state
                  animate="animate" // Reference to the animate variant
                >
                  <Bot size={48} className="text-white" />
                </motion.div>
              )}
            </div>
          )}
          {activeTab === 'recipe-converter' && (
            <div className="flex flex-col min-h-[450px]">
              <Typography variant="bold">
                Use your own ChatGPT plus account (free)
              </Typography>
              <Typography variant="pn">
                Upload an image or text to the <i>Recipe Converter GPT</i> here:
              </Typography>
              <a
                href="https://chat.openai.com/g/g-0y8Fagkla-recipe-converter-gpt"
                target="_blank"
                className="text-primary-500 hover:underline"
              >
                https://chat.openai.com/g/g-0y8Fagkla-recipe-converter-gpt
              </a>
              <Typography>
                Copy the JSON block generated by the AI and paste it here:
              </Typography>
              <Textarea
                placeholder="Paste AI generated JSON here..."
                className="w-full"
                value={inputJSON}
                onChange={(e) => setInputJSON(e.target.value)}
                rows={15}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {activeTab === 'text' && (
            <Button
              onClick={onSaveText}
              disabled={isSaving || !textInput || success}
            >
              {isSaving ? 'Analyzing text...' : 'AI Upload'}
            </Button>
          )}
          {activeTab === 'image' && (
            <Button
              onClick={onSaveImage}
              disabled={isSaving || !image || success}
            >
              {isSaving ? 'Analyzing image...' : 'AI Upload'}
            </Button>
          )}
          {activeTab === 'recipe-converter' && (
            <Button
              onClick={onSavePersonal}
              disabled={isSaving || !inputJSON || success}
            >
              {isSaving ? 'Processing Text...' : 'Save Recipe'}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
