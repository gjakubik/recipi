'use client'

import * as React from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

import { Label } from './label'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

interface CheckboxAreaProps extends React.ComponentPropsWithoutRef<'label'> {
  disabled?: boolean
}

const CheckboxArea = React.forwardRef<
  React.ElementRef<'label'>,
  CheckboxAreaProps
>(({ className, disabled, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(
      'flex items-center space-x-2 rounded-md border border-input px-4 py-3',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground',
      {
        'cursor-not-allowed opacity-50': disabled,
      },
      className
    )}
    {...props}
  />
))

CheckboxArea.displayName = 'CheckboxArea'

export { Checkbox, CheckboxArea }
