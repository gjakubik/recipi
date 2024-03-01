'use client'

import React, { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { fractionToFloat } from '@/lib/utils'
import { serverFetch } from '@/app/_actions/serverFetch'

export const ParseTesterForm = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isParsing, setIsParsing] = useState<boolean>(false)

  const onSubmit = async (input: string) => {
    setIsParsing(true)

    // **************************************
    // Add arbitrary logic here to test parsing
    const res = await serverFetch(input)
    const parsed = res

    // **************************************
    setOutput(parsed)
    setIsParsing(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="h5">Input:</Typography>
        <Textarea
          placeholder="Enter text to parse"
          className="w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={15}
        />
        <Button onClick={() => onSubmit(input)} disabled={isParsing}>
          {isParsing ? <Loader2 /> : 'Parse'}
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="h5">Output: {output.length}</Typography>
        <Typography>{output}</Typography>
      </div>
    </div>
  )
}
