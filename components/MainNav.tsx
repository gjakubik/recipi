'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from 'next-auth'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { NavConfig, NavGroup, NavItem } from '@/types'
import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover'
import { Search } from '@/components/Search'
import { MobileNav } from '@/components/MobileNav'
import {
  ActivityLogIcon,
  HamburgerMenuIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cross1Icon,
} from '@radix-ui/react-icons'

export interface HeaderProps {
  user?: User | null
  config: NavConfig
  children?: React.ReactNode
}
export const MainNav = ({ user, config, children }: HeaderProps) => {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [groupHoverState, setGroupHoverState] = useState(
    config.items.map(() => false)
  )

  const handleMouseEnter = (index: number) => {
    const state = [...groupHoverState]
    state[index] = true
    setGroupHoverState(state)
  }

  const handleMouseLeave = (index: number) => {
    const state = [...groupHoverState]
    state[index] = false
    setGroupHoverState(state)
  }

  const handleOpenChange = (open: boolean, index: number) => {
    const state = [...groupHoverState]
    state[index] = open
    setGroupHoverState(state)
  }

  const handleSignIn = (provider: string) => {
    setIsLoading(true)

    signIn(provider).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <header>
      <div className="flex flex-row justify-between gap-4 items-center h-[90px] sm:mr-4">
        <Link href="/">
          <div className="hidden md:flex justify-center items-center gap-4 px-4 sm:pl-12 py-4">
            <ActivityLogIcon className="h-6 w-6" />
            <Typography variant="h3">Recipi</Typography>
          </div>
        </Link>

        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="grow flex md:hidden justify-start items-center gap-1 hover:cursor-pointer px-4 sm:pl-6 py-4"
        >
          <div className="flex justify-center items-center gap-3">
            {isDropdownOpen ? (
              <Cross1Icon className="h-6 w-6" />
            ) : (
              <ActivityLogIcon className="h-6 w-6" />
            )}
            <Typography variant="h3">Menu</Typography>
          </div>
          {isDropdownOpen ? (
            <ChevronDownIcon className="mt-1" />
          ) : (
            <ChevronRightIcon className="mt-1" />
          )}
        </div>
        {isDropdownOpen && (
          <MobileNav user={user} pathname={pathname} config={config}>
            {children}
          </MobileNav>
        )}
        <div className="hidden md:flex flex-row space-x-8 justify-self-stretch grow ml-4 h-full">
          {config.items.map((item, ix) => {
            //test if item is of type NavGroup
            if ((item as NavGroup).items) {
              const group = item as NavGroup
              return (
                <Popover
                  open={groupHoverState[ix]}
                  onOpenChange={(open) => handleOpenChange(open, ix)}
                  key={group.href}
                >
                  <Link
                    href={group.href}
                    className={`h-full m-auto self-stretch flex flex-row items-center justify-between ${
                      groupHoverState[ix]
                        ? 'bg-neutral-100 dark:bg-secondary shadow-lg'
                        : ''
                    }`}
                  >
                    <PopoverAnchor
                      className={`w-full h-full flex flex-row items-center gap-2`}
                      onMouseEnter={() => handleMouseEnter(ix)}
                      onMouseLeave={() => handleMouseLeave(ix)}
                    >
                      <div className="flex flex-row items-center gap-2 px-4">
                        <Typography
                          className={`dashed-border-hover
                          ${pathname === group.href ? 'font-semibold' : ''}`}
                        >
                          {group.title}
                        </Typography>
                        {groupHoverState[ix] ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </div>
                    </PopoverAnchor>
                  </Link>
                  <PopoverContent
                    id="test-popover-id"
                    sideOffset={-0.5}
                    align="start"
                    onMouseEnter={() => handleMouseEnter(ix)}
                    onMouseLeave={() => handleMouseLeave(ix)}
                    className={cn(
                      `rounded-none border-none shadow-lg px-4 pt-0 flex flex-col gap-2 bg-neutral-100 dark:bg-secondary`,
                      {
                        'w-[120px]': group.minWidth === 'small',
                      }
                    )}
                  >
                    <div
                      className={`w-full flex flex-col space-y-2 items-stretch`}
                    >
                      {group.items.map((link) => (
                        <Link
                          href={link.href}
                          key={link.href}
                          className="dashed-border-hover"
                        >
                          <Typography
                            className={
                              pathname === link.href ? 'font-semibold' : ''
                            }
                          >
                            {link.title}
                          </Typography>
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )
            } else {
              const link = item as NavItem
              if (link.admin && user?.role !== 'admin') return null
              if (link.authenticated && !user) return null
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-row items-center gap-2"
                >
                  <Typography
                    className={`m-auto dashed-border-hover ${
                      pathname === link.href ? 'font-semibold' : ''
                    }`}
                  >
                    {link.title}
                  </Typography>
                </Link>
              )
            }
          })}
        </div>
        <div className="flex flex-row space-x-4">
          {config.searchVisible && <Search className="hidden sm:flex" />}
          {!!user && pathname !== '/create' && config.createVisible && (
            <Button
              asChild
              variant="secondary"
              className="hidden sm:flex min-w-[110px]"
            >
              <Link href="/create">Add Recipe</Link>
            </Button>
          )}
          {!user && (
            <Button onClick={() => handleSignIn('google')} disabled={isLoading}>
              Sign In
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-4 py-4">
                <HamburgerMenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Theme Preference
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {user?.role === 'admin' && (
                <DropdownMenuItem>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (!!user ? signOut() : handleSignIn('google'))}
              >
                {!!user ? 'Log Out' : 'Sign In'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </header>
  )
}
