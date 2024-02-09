'use server'

import { getCurrentUser } from '@/lib/session'
import OpenAI from 'openai'
import { UploadFileResponse } from 'uploadthing/client'

const createRecipeGenerationPrompt = (isText: boolean) => `I have ${
  isText ? 'text' : 'an image'
} of a recipe and the following data type. Parse what is in the ${
  isText ? 'text' : 'image'
} and then transfer the contents into the following data type. 
    Please be very careful to be specific about the measurements, as you often mistake 4 for 2s in denominators. There will be some fields such as prep time and cooking time that will need to be inferred by you. The amount of servings will also need to be inferred. Even if you are not sure the amount of servings, make a concrete estimate.
    If you are unable to make a concrete estimate, use the integer 0. Make sure that any amounts are json strings, and that any amounts use fractions instead of decimals. Fractions should be in the form of "1 1/2", with no other special characters used than /
    Be precise in naming ingredients, and put any extra information related to it in the note field. If there is no note, dont define the field. 

    Generate a JSON object that fits this type
    Unit may be something different than these, but should be a full word, not an abbreviation
    type Unit = 'teaspoon' | 'tbs' | 'cup' | 'oz' | 'lb' | 'ml' | 'l' | 'g' | 'kg' | 'whole' | 'round' |'package' | 'clove';
    type Time = 'hhh:mm:ss'
    type Amount = 'number' | 'number number/number'

    interface RecipeForm {
      title: string;
      description: string;
      preparationTime: Time;
      cookingTime: Time;
      servings: string;
      difficultyLevel: string;
      instructions: string[];
      ingredients?: {
        amount: Amount;
        unit: Unit;
        name: string;
        note?: string;
      }[];
    }
    Refrain from leaving any comments at all, and output only JSON. Again, this response should start with \`\`\`json and end with \`\`\`, meaning that it is only the json block representing the recipe`

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
    ${createRecipeGenerationPrompt(true)}
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
          { type: 'text', text: createRecipeGenerationPrompt(false) },
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
