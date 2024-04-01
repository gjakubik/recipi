'use client'

import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Separator } from './separator'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      'flex items-center justify-between text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90',
      className
    )}
    {...props}
  >
    <CaretRightIcon className="h-6 w-6 text-muted-foreground transition-transform duration-200" />
    {children}
  </CollapsiblePrimitive.CollapsibleTrigger>
))

CollapsibleTrigger.displayName =
  CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      className
    )}
    {...props}
  >
    <div className="ml-1 flex h-full flex-row pb-0 pt-0">
      <Separator
        orientation="vertical"
        className="stretch ml-2 h-full"
        decorative
      />
      {children}
    </div>
  </CollapsiblePrimitive.CollapsibleContent>
))

CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
