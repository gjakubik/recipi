'use client'

import { cn } from '@/lib/utils'
import { Options } from 'nuqs'
import useSearch from '@/app/store/useSearch'

import { Input } from '@/components/ui/input'
import { Icons } from '@/components/CustomIcons'

interface SearchProps {
  className?: string
  placeholder?: string
  value: string
  setValue?: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({
  className,
  placeholder = 'Filter data...',
  value,
  setValue,
  onChange,
}: SearchProps) {
  return (
    <div className={cn(className, 'relative')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500"
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
        onChange={onChange}
        value={value}
      />
      {value?.length > 0 && (
        <Icons.circlex
          onClick={() => setValue?.(null)}
          className="absolute bottom-0 right-3 top-0 my-auto h-6 w-6 cursor-pointer text-gray-500 hover:h-[25px] hover:w-[25px]"
        />
      )}
    </div>
  )
}
