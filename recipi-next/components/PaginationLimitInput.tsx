'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMenuQueryString, getRecipeQueryString } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

interface PaginationLimitInputProps {
  mode?: 'client' | 'server-recipe' | 'server-menu'
  basePath?: string
  page: number
  limit: number
  setLimit?: (value: number) => void
}

export const PaginationLimitInput = ({
  mode,
  basePath = '/',
  page,
  limit,
  setLimit,
}: PaginationLimitInputProps) => {
  const router = useRouter()
  const [inputLimit, setInputLimit] = useState(limit)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setInputLimit(value)
    setLimit && e.target.value !== '' && setLimit(value) // Client is quick to update, so we can update the limit immediately
  }

  const handleSetLimit = () => {
    // find the page that the middle element of the current page is on
    const middlePage = Math.floor((page * limit) / inputLimit)
    if (mode === 'server-recipe') {
      router.push(
        `${basePath}?${getRecipeQueryString({
          page: middlePage.toString(),
          limit: inputLimit.toString(),
        })}`
      )
    } else if (mode === 'server-menu') {
      router.push(
        `${basePath}?${getMenuQueryString({
          page: middlePage.toString(),
          limit: inputLimit.toString(),
        })}`
      )
    } else {
      setLimit && setLimit(inputLimit)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSetLimit()
    }
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <Typography variant="pn">Per Page: </Typography>
      <Input
        type="number"
        min="1"
        max="100"
        value={inputLimit}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleSetLimit}
        className="w-16"
      />
    </div>
  )
}
