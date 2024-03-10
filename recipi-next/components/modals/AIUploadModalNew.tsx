'use client'

import { PropsWithChildren, useCallback, useState } from 'react'
import { Variants, motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { useToast } from '@/components/ui/use-toast'
import { abbToUnit } from '@/lib/utils'
import {
  recipeAIUploadText,
  recipeAIUploadImage,
  recipeAIUploadUrl,
  recipeAIIngestIngredients,
} from '@/app/_actions/recipeAIUpload'
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
import { Input } from '@/components/ui/input'
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
  const [image, setImage] = useState<UploadFileResponse<null> | null>(null)
  const [inputJSON, setInputJSON] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('text')

  const setFormValues = useCallback(
    (data: any) => {
      const setValue = form.setValue
      try {
        setValue('title', data.title || '')
        setValue('description', data.description || '')
        setValue('difficultyLevel', _.lowerCase(data.difficultyLevel) || '')
        setValue('servings', data.servings || '')
        setValue('preparationTime', data.preparationTime || '')
        setValue('cookingTime', data.cookingTime || '')
        setValue(
          'ingredients',
          // @ts-ignore
          data.ingredients?.map((ing, i) => ({
            ...ing,
            id: i,
            amount: parseFloat(ing.amount) ? ing.amount : '',
            unit: abbToUnit(_.trimEnd(ing.unit || ing.amount, 's')),
          })) || []
        )
        setValue(
          'instructions',
          // @ts-ignore
          data.instructions?.map((instruction, i) => ({
            id: i,
            instruction,
          })) || []
        )
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to set form values',
          variant: 'destructive',
        })
      }
    },
    [form, toast]
  )

  const handleSave = async (
    uploadFunction: (
      data: string | UploadFileResponse<null>
    ) => Promise<string | undefined>,
    data: string | UploadFileResponse<null>
  ) => {
    setIsSaving(true)
    try {
      const res = await uploadFunction(data)
      if (!res) throw new Error('Upload failed')

      const parsedData = res
      setFormValues(parsedData)

      setIsSaving(false)
      setOpen(false)
      toast({ title: 'Success', description: 'Recipe processed successfully!' })
    } catch (error: any) {
      console.error(error)
      setIsSaving(false)
      toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      })
    }
  }

  const onSaveText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleSave(
      recipeAIUploadText as (
        data: string | UploadFileResponse<null>
      ) => Promise<string | undefined>,
      textInput
    )
  }

  const onSaveImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!image) return
    handleSave(
      recipeAIUploadImage as (
        data: string | UploadFileResponse<null>
      ) => Promise<string | undefined>,
      image
    )
  }

  const onSaveUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    handleSave(
      recipeAIUploadUrl as (
        data: string | UploadFileResponse<null>
      ) => Promise<string | undefined>,
      urlInput
    )
  }

  const onSavePersonal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const parsedData = JSON.parse(inputJSON)
      setFormValues(parsedData)

      setIsSaving(false)
      setOpen(false)
      toast({ title: 'Success', description: 'Recipe processed successfully!' })
    } catch (e: any) {
      console.error(e)
      setIsSaving(false)
      toast({
        title: 'Error',
        description: e.message || 'An error occurred',
        variant: 'destructive',
      })
    }
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
            className={`hover:cursor px-2 pb-3 ${
              activeTab === 'text'
                ? 'long-dashed-border font-bold'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            Text
          </Button>
          <Button
            onClick={() => setActiveTab('url')}
            variant="text"
            className={`hover:cursor px-2 pb-3 ${
              activeTab === 'url'
                ? 'long-dashed-border font-bold'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            URL
          </Button>
          <Button
            onClick={() => setActiveTab('image')}
            variant="text"
            className={`hover:cursor px-2 pb-3 ${
              activeTab === 'image'
                ? 'long-dashed-border font-bold'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            Image
          </Button>
          <Button
            onClick={() => setActiveTab('recipe-converter')}
            variant="text"
            className={`hover:cursor px-2 pb-3 ${
              activeTab === 'recipe-converter'
                ? 'long-dashed-border font-bold'
                : 'dashed-border-hover'
            } transition duration-150 ease-in-out`}
          >
            ChatGPT
          </Button>
        </div>
        <div className="m-auto min-h-[450px] w-full max-w-[500px]">
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
          {activeTab === 'url' && (
            <div className="flex flex-col gap-2">
              <Typography variant="p">
                Paste the URL of the recipe here:
              </Typography>
              <Input
                placeholder="Recipe URL goes here..."
                className="w-full"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
          )}
          {activeTab === 'image' && (
            <div className="relative flex flex-col gap-2">
              <Typography variant="p">Upload the recipe image here:</Typography>
              {!image && (
                <UploadDropzone<UploadThingFileRouter, 'titleImage'>
                  className="h-[400px] drop-shadow-md"
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
                  className={`h-[400px] w-full rounded-md object-cover ${
                    isSaving ? 'brightness-50 grayscale' : ''
                  }`}
                />
              )}
              {isSaving && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
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
            <div className="flex min-h-[450px] flex-col">
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
          {activeTab === 'url' && (
            <Button
              onClick={onSaveUrl}
              disabled={isSaving || !urlInput || success}
            >
              {isSaving ? 'Analyzing URL...' : 'AI Upload'}
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
