import * as React from 'react'
import Link from 'next/link'
import { User } from 'next-auth'
import { cn } from '@/lib/utils'
import { useLockBody } from '@/hooks/use-lock-body'
import { NavConfig, NavGroup, NavItem } from '@/types'

import { Typography } from '@/components/ui/typography'
import { ActivityLogIcon } from '@radix-ui/react-icons'

interface MobileNavProps {
  children?: React.ReactNode
  user?: User | null
  pathname: string
  config: NavConfig
}

export function MobileNav({
  children,
  user,
  pathname,
  config,
}: MobileNavProps) {
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
        <nav className="grid grid-flow-row auto-rows-max text-sm gap-3 text-muted-foreground">
          {config.items.map((item) => {
            if ((item as NavGroup).items) {
              const group = item as NavGroup
              return (
                <div key={group.title}>
                  <Link href={group.href}>
                    <Typography variant="bold">{group.title}</Typography>
                  </Link>
                  <div className="grid grid-flow-row auto-rows-max">
                    {group.items.map((item) => {
                      if (item.admin && user?.role !== 'admin') return null
                      if (item.authenticated && !user) return null
                      return (
                        <Link key={item.href} href={item.href}>
                          <Typography>{item.title}</Typography>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            }
            const navItem = item as NavItem
            if (navItem.admin && user?.role !== 'admin') return null
            if (navItem.authenticated && !user) return null
            return (
              <Link key={navItem.href} href={item.href}>
                <Typography variant="bold">{navItem.title}</Typography>
              </Link>
            )
          })}
          {!!user && pathname !== '/create' && config.createVisible && (
            <Link href="/create">
              <Typography variant="bold">Create Recipe</Typography>
            </Link>
          )}
        </nav>
        {children}
      </div>
    </div>
  )
}
