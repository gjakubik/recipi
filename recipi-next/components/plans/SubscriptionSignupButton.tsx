'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button, Loading } from '@lemonsqueezy/wedges'
import { getCheckoutUrl } from '@/lib/db/api'
import { cn } from '@/lib/utils'
import { NewPlan } from '@/types'
import { useToast } from '@/components/ui/use-toast'

export function SubscriptionSignupButton(props: {
  plan: NewPlan
  currentPlan?: NewPlan
  embed?: boolean
  className?: string
}) {
  const { plan, currentPlan, embed = true, className } = props
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [origin, setOrigin] = useState('')
  const [loading, setLoading] = useState(false)
  const isCurrent = plan.id === currentPlan?.id

  const label = isCurrent ? 'Your plan' : 'Sign up'

  // Make sure Lemon.js is loaded, you need to enqueue the Lemon Squeezy SDK in your app first.
  useEffect(() => {
    if (typeof window !== undefined && window.location.origin) {
      setOrigin(window.location.origin)
    }
    if (typeof window.createLemonSqueezy === 'function') {
      window.createLemonSqueezy()
    }
  }, [setOrigin])

  console.log('redirectUrl', origin + pathname)

  return (
    <Button
      before={loading ? <Loading /> : undefined}
      disabled={loading || isCurrent}
      onClick={async () => {
        // Create a checkout and open the Lemon.js modal
        let checkoutUrl: string | undefined = ''

        try {
          setLoading(true)
          checkoutUrl = await getCheckoutUrl(
            plan.variantId,
            `${origin}${pathname}`,
            embed
          )

          console.log('checkoutUrl', checkoutUrl)
        } catch (error) {
          setLoading(false)
          toast({
            title: 'Error creating a checkout.',
            description:
              'Please check the server console for more information.',
          })
        } finally {
          embed && setLoading(false)
        }

        embed
          ? checkoutUrl && window.LemonSqueezy.Url.Open(checkoutUrl)
          : router.push(checkoutUrl ?? '/')
      }}
      className={cn('dark:text-black', className)}
    >
      {label}
    </Button>
  )
}
