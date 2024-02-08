'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMenuQueryString } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

interface PaginationLimitInputProps {
  mode?: 'client' | 'server'
  basePath?: string
  limit: number
  setLimit?: (value: number) => void
}

export const PaginationLimitInput = ({
  basePath = '/',
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
    if (!setLimit) {
      router.push(
        `${basePath}?${getMenuQueryString({
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
