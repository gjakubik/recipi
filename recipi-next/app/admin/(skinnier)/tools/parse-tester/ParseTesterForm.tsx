'use client'

import React, { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Loader2, CopyIcon } from 'lucide-react'
import { fractionToFloat } from '@/lib/utils'
import { serverFetch } from '@/app/_actions/serverFetch'
import { useToast } from '@/components/ui/use-toast'

export const ParseTesterForm = () => {
  const { toast } = useToast()
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isParsing, setIsParsing] = useState<boolean>(false)

  const onSubmit = async (input: string) => {
    setIsParsing(true)

    // **************************************
    // Add arbitrary logic here to test parsing
    // const res = await serverFetch(input)
    const transformedInput = input
      .replace(/`/g, '"')
      .replace(/tinyint\(1\)/g, 'boolean')
      .replace(/int/g, 'integer')
      .replace(/ON UPDATE CURRENT_TIMESTAMP/g, '')
      .replace(/AUTO_INCREMENT=\d*/g, '')
      .replace(/ENGINE=InnoDB/g, '')
      .replace(/COLLATE=[^ ]*/g, '')

    const lines = transformedInput.split('\n')

    // Process each line
    const processedLines = lines.map((line) => {
      const isInsertStatement = line.toLowerCase().startsWith('insert into')

      // Replace backticks with double quotes for INSERT statements
      if (isInsertStatement) {
        line = line.replace(/\`/g, '"')
      } else {
        line = line.replace(/,"(?![^[]*\])(?![^{]*})/g, ",'")
        line = line.replace(/",(?![^[]*\])(?![^{]*})/g, "',")
        line = line.replace(/\("/g, "('")
        line = line.replace(/"\)/g, "')")
        line = line.replace(/\\'/g, "''")
        line = line.replace(/\\\\"/g, '\\"')
      }

      // Check if the line contains a JSON string (object or array)
      const jsonMatches = line.match(/"(\{[^}]*\}|\[[^\]]*\])"/g)

      if (jsonMatches) {
        jsonMatches.forEach((jsonMatch) => {
          // Remove the surrounding double quotes
          const jsonString = jsonMatch.slice(1, -1)
          // Remove the escape characters before double quotes within the JSON string
          const processedJsonString = jsonString
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "''")

          // Replace the original JSON string with the processed one, enclosed in single quotes
          line = line.replace(jsonMatch, `'${processedJsonString}'`)
        })
      }

      return line
    })

    const parsed = processedLines.join('\n')
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
        <div className="flex flex-row items-center gap-2">
          <Typography variant="h5">Output: {output.length}</Typography>
          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(output)
              toast({
                title: 'Copied to clipboard',
              })
            }}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <Typography>{output}</Typography>
      </div>
    </div>
  )
}
