'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User } from 'next-auth'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
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
import { MobileNav } from './MobileNav'
import {
  ActivityLogIcon,
  HamburgerMenuIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cross1Icon,
} from '@radix-ui/react-icons'
import { Search } from './Search'

export interface HeaderProps {
  user?: User | null
  children?: React.ReactNode
}
export const MainNav = ({ user, children }: HeaderProps) => {
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
        <div className="hidden md:flex justify-center items-center gap-4">
          <ActivityLogIcon className="h-6 w-6" />
          <Typography variant="h3">Recipi</Typography>
        </div>

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
        {isDropdownOpen && <MobileNav>{children}</MobileNav>}
        <div className="hidden md:flex flex-row space-x-8">
          <Link href="/">
            <Typography
              className={pathname === '/' ? 'font-semibold' : undefined}
            >
              Explore
            </Typography>
          </Link>
          <Link href="/my-recipes">
            <Typography
              className={
                pathname === '/my-recipes' ? 'font-semibold' : undefined
              }
            >
              My Recipes
            </Typography>
          </Link>
          <Link href="/bulk-upload">
            <Typography
              className={
                pathname === '/bulk-upload' ? 'font-semibold' : undefined
              }
            >
              Bulk Upload
            </Typography>
          </Link>
        </div>
        <div className="flex flex-row space-x-4">
          <Search className="hidden sm:flex" />
          {!!user && pathname !== '/create' && (
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
