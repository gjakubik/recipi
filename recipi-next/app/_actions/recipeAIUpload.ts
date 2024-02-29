'use server'

import { getCurrentUser } from '@/lib/session'
import OpenAI from 'openai'
import { UploadFileResponse } from 'uploadthing/client'
import {
  TEXT_PROMPT,
  IMAGE_PROMPT,
  URL_PROMPT,
} from '@/lib/constants/AIPrompts'

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const recipeAIUploadText = async (inputText: string) => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('No user found, login to use this feature')
  }

  //Creat a request to my open ai assistant to generate recipe json from the input text
  const prompt = `
    ${TEXT_PROMPT}
    Recipe Text: ${inputText}
  `

  const gptResponse = await ai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  })

  const dirtyResponse = gptResponse.choices[0].message.content

  // strip all text inside ```json and ```
  const recipeJSON = dirtyResponse?.replace(/```json/g, '').replace(/```/g, '')

  console.log(recipeJSON)

  return recipeJSON
}

export const recipeAIUploadUrl = async (url: string) => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('No user found, login to use this feature')
  }

  // Get the html content of the url
  const htmlResponse = await fetch(url)
  const html = await htmlResponse.text()

  if (!html) throw new Error('No html found at url')

  // Try to extract the body of the html
  const body = html.match(/<body[^>]*>((.|[\n\r])*)<\/body>/)

  if (!body) throw new Error('No body found in html')

  const cleanedBody = body[0]
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<img[\s\S]*?>/g, '')
    .replace(/<form[\s\S]*?<\/form>/g, '')
    .replace(/<a[\s\S]*?<\/a>/g, '')
    .replace(/<[^>]*>/g, '')

  console.log(cleanedBody)

  const prompt = `
    ${URL_PROMPT}
    HTML: ${cleanedBody}
  `
  // Convert the html to text using your AI model
  const htmlTextResponse = await ai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const dirtyResponse = htmlTextResponse.choices[0].message.content
  // Process the html text to JSON, similar to how it's done in recipeAIUploadText
  const recipeJSON = dirtyResponse?.replace(/```json/g, '').replace(/```/g, '')

  console.log(recipeJSON)

  return recipeJSON
}

export const recipeAIUploadImage = async (image: UploadFileResponse) => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('No user found, login to use this feature')
  }

  // Convert the image to text using your AI model
  const imageTextResponse = await ai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: IMAGE_PROMPT },
          {
            type: 'image_url',
            image_url: {
              url: image.url,
            },
          },
        ],
      },
    ],
    max_tokens: 1000,
  })

  // Delete the image from uploadthing using fetch
  await fetch('https://uploadthing.com/api/deleteFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET || '',
    },
    body: JSON.stringify({
      fileKeys: [
        image.key, // Make sure to replace this with the actual key of the file you want to delete
      ],
    }),
  })

  console.log('ai res', imageTextResponse)

  if (imageTextResponse.choices[0].finish_reason === 'length') {
    throw new Error(
      'The recipe is too long for the AI to process. Please upgrade your plan or try again'
    )
  }

  const dirtyResponse = imageTextResponse.choices[0].message.content
  // Process the image text to JSON, similar to how it's done in recipeAIUploadText
  const recipeJSON = dirtyResponse?.replace(/```json/g, '').replace(/```/g, '')

  console.log('parsed json', recipeJSON)

  return recipeJSON
}
