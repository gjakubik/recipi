import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLockBody } from '@/hooks/use-lock-body'

import { Typography } from './ui/typography'
import { ActivityLogIcon } from '@radix-ui/react-icons'

interface MobileNavProps {
  children?: React.ReactNode
}

export function MobileNav({ children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <ActivityLogIcon className="h-6 w-6" />
          <Typography variant="h3">Recipi</Typography>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm gap-4 text-muted-foreground">
          <Link href="/">Explore</Link>
          <Link href="/my-recipes">My Recipes</Link>
          <Link href="/create">Create Recipe</Link>
        </nav>
        {children}
      </div>
    </div>
  )
}
