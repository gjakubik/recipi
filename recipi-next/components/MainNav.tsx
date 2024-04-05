'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { NavConfig, NavGroup, NavItem } from '@/types'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'

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
// import { Search } from '@/components/Search'
import { MobileNav } from '@/components/MobileNav'
import { Icons } from '@/components/CustomIcons'
import {
  ActivityLogIcon,
  HamburgerMenuIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cross1Icon,
} from '@radix-ui/react-icons'
import { UserIcon, SunMoon, Wrench, Sun, Moon } from 'lucide-react'

export interface HeaderProps {
  config: NavConfig
  children?: React.ReactNode
}
export const MainNav = ({ config, children }: HeaderProps) => {
  const { setTheme: setThemeState } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const user = useCurrentUser()
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

  const setTheme = (theme: string) => {
    setThemeState(theme)
    router.refresh()
  }

  return (
    <header>
      <div className=" flex h-[90px] w-full flex-row items-center justify-between gap-4 sm:mr-4">
        <Link href="/">
          <div className="hidden items-center justify-center gap-4 px-4 py-4 sm:pl-12 md:flex">
            <ActivityLogIcon className="h-6 w-6" />
            {/* <Icons.logo className="mb-1 h-8 w-8" /> */}
            <Typography variant="h3">Recipi</Typography>
          </div>
        </Link>

        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex grow items-center justify-start gap-1 px-4 py-4 hover:cursor-pointer sm:pl-6 md:hidden"
        >
          <div className="flex items-center justify-center gap-3">
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
        <div className="ml-4 hidden h-full grow flex-row space-x-8 justify-self-stretch md:flex">
          {config.items.map((item, ix) => {
            //test if item is of type NavGroup
            if (item.authenticated && !user) return null
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
                    className={`m-auto flex h-full flex-row items-center justify-between self-stretch ${
                      groupHoverState[ix]
                        ? 'bg-neutral-100 shadow-lg dark:bg-secondary'
                        : ''
                    }`}
                  >
                    <PopoverAnchor
                      className={cn(
                        `flex h-full w-full flex-row items-center justify-center gap-2`,
                        {
                          'w-[120px]': group.minWidth === 'small',
                          'w-[150px]': group.minWidth === 'medium',
                        }
                      )}
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
                      `flex flex-col gap-2 rounded-none border-none bg-neutral-100 px-4 pt-0 shadow-lg dark:bg-secondary`,
                      {
                        'w-[120px]': group.minWidth === 'small',
                        'w-[150px]': group.minWidth === 'medium',
                      }
                    )}
                  >
                    <div
                      className={`flex w-full flex-col items-stretch space-y-2`}
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
                    className={`dashed-border-hover m-auto ${
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
        <div className="mr-4 flex flex-row space-x-4">
          {/* {config.searchVisible && <Search className="hidden sm:flex" />} */}
          {!!user && pathname !== '/create' && config.createVisible && (
            <Button
              asChild
              variant="secondary"
              className="hidden min-w-[110px] sm:flex"
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
              {user && (
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user.id}`} className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="mr-2 h-4 w-4" />
                  Theme Preference
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      <Sun className="mr-2 h-4 w-4" /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      <SunMoon className="mr-2 h-4 w-4" />
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {user?.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    <Wrench className="mr-2 h-4 w-4" />
                    Admin
                  </Link>
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
