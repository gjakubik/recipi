'use client'

import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/CustomIcons'

interface SearchProps {
  placeholder?: string
  paramName?: string
  className?: string
  withButton?: boolean
  mode?: 'client' | 'server'
}

export function UrlSearch({
  className,
  paramName = 'search',
  placeholder = 'Type to search Recipi...',
  withButton = false,
  mode = 'client',
}: SearchProps) {
  const router = useRouter()
  const [search, setSearch] = useQueryState(paramName)

  return (
    <div className={cn(className, 'relative flex flex-row gap-2')}>
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
        onChange={(e) =>
          setSearch(e.target.value === '' ? null : e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            mode === 'server' && router.refresh()
          }
        }}
        value={search || ''}
      />
      {search && (
        <Icons.circlex
          onClick={() => setSearch(null)}
          className="absolute bottom-0 right-3 top-0 my-auto h-6 w-6 cursor-pointer text-gray-500 hover:h-[25px] hover:w-[25px]"
        />
      )}
      {withButton && (
        <Button onClick={() => mode === 'server' && router.refresh()}>
          Search
        </Button>
      )}
    </div>
  )
}
