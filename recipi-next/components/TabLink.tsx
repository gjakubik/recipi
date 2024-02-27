'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TabLinkProps extends PropsWithChildren {
  tabId: string
}

export const TabLink = ({ tabId, children }: TabLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname.split('/').pop() == tabId
  const pathBase = pathname.split('/').slice(0, -1).join('/')

  return (
    <Link
      href={`${pathBase}/${tabId}`}
      className={cn('dashed-border-hover px-4 pb-3', isActive && 'font-bold')}
    >
      {children}
    </Link>
  )
}
