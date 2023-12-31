'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from 'next-auth'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { NavConfig } from '@/types'

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

  const handleSignIn = (provider: string) => {
    setIsLoading(true)

    signIn(provider).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <header>
      <div className="flex flex-row justify-between gap-4 items-center px-4 sm:px-12 py-4">
        <Link href="/">
          <div className="hidden md:flex justify-center items-center gap-4">
            <ActivityLogIcon className="h-6 w-6" />
            <Typography variant="h3">Recipi</Typography>
          </div>
        </Link>

        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex md:hidden justify-center items-center gap-1 hover:cursor-pointer"
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
        <div className="hidden md:flex flex-row space-x-8 justify-start grow ml-4">
          {config.items.map((item) => {
            if (item.admin && user?.role !== 'admin') return null
            if (item.authenticated && !user) return null
            return (
              <Link key={item.href} href={item.href}>
                <Typography
                  className={pathname === item.href ? 'font-semibold' : ''}
                >
                  {item.title}
                </Typography>
              </Link>
            )
          })}
        </div>
        <div className="flex flex-row space-x-4">
          {config.searchVisible && <Search className="hidden sm:flex" />}
          {!!user && pathname !== '/create' && config.createVisible && (
            <Button asChild className="hidden sm:flex min-w-[110px]">
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
              <Button variant="ghost">
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
