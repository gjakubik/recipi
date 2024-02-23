'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'

interface SearchProps {
  initialSearch: string
  placeholder?: string
  className?: string
}

export function UrlSearch({
  initialSearch,
  className,
  placeholder = 'Type to search Recipi...',
}: SearchProps) {
  const [search, setSearch] = useState(initialSearch)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={cn(className, 'relative')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-12 pr-4"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (search === '') {
              router.replace(pathname)
              return
            }
            router.replace(pathname + '?search=' + search)
          }
        }}
        value={search}
      />
    </div>
  )
}
