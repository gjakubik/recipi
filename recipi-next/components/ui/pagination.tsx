import * as React from 'react'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants, Button } from '@/components/ui/button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type ServerPaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

type ClientPaginationButtonProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  ButtonProps

const ServerPaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: ServerPaginationLinkProps) => (
  <PaginationItem>
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...props}
    />
  </PaginationItem>
)
ServerPaginationLink.displayName = 'ServerPaginationLink'

const ClientPaginationButton = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: ClientPaginationButtonProps) => (
  <PaginationItem>
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      {...props}
    />
  </PaginationItem>
)
ClientPaginationButton.displayName = 'ClientPaginationButton'

const ServerPaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof ServerPaginationLink> & {
  disabled?: boolean
}) => (
  <ServerPaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className, {
      ['opacity-50']: disabled,
      ['cursor-not-allowed']: disabled,
    })}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </ServerPaginationLink>
)
ServerPaginationPrevious.displayName = 'ServerPaginationPrevious'

const ClientPaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof ClientPaginationButton> & {
  disabled?: boolean
}) => (
  <ClientPaginationButton
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className, {
      ['opacity-50']: disabled,
      ['cursor-not-allowed']: disabled,
    })}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </ClientPaginationButton>
)
ClientPaginationPrevious.displayName = 'ClientPaginationPrevious'

const ServerPaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof ServerPaginationLink> & {
  disabled?: boolean
}) => (
  <ServerPaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className, {
      ['opacity-50']: disabled,
      ['cursor-not-allowed']: disabled,
    })}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </ServerPaginationLink>
)
ServerPaginationNext.displayName = 'ServerPaginationNext'

const ClientPaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof ClientPaginationButton> & {
  disabled?: boolean
}) => (
  <ClientPaginationButton
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className, {
      ['opacity-50']: disabled,
      ['cursor-not-allowed']: disabled,
    })}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </ClientPaginationButton>
)
ClientPaginationNext.displayName = 'ClientPaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  ServerPaginationLink,
  ClientPaginationButton,
  PaginationItem,
  ServerPaginationPrevious,
  ServerPaginationNext,
  ClientPaginationPrevious,
  ClientPaginationNext,
  PaginationEllipsis,
}
