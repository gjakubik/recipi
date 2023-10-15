import { NextResponse, NextRequest } from 'next/server'
import { createRecipe } from '@/lib/db/api'
import { Recipe } from '@/lib/types'

// TODO; GET and POST recipes
export async function POST(req: NextRequest) {
  console.log('req', req)
  const payload: Recipe = await req.json()
  console.log('payload', payload)
  const newRecipe = createRecipe(payload)
  console.log('newRecipe', newRecipe)
  return NextResponse.json(newRecipe)
}
