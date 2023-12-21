'use client'

import { cn } from '@/lib/utils'
import useSearch from '@/app/store/useSearch'
import { Input } from '@/components/ui/input'

interface SearchProps {
  className?: string
}

export function Search({ className }: SearchProps) {
  const { search, setSearch } = useSearch()

  return (
    <div className={cn(className, 'relative')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
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
        placeholder="Search recipes"
        className="pl-12 pr-4"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  )
}