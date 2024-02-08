'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateFeatureFlag } from '@/lib/db/api'
import { FeatureFlag } from '@/types'

import { useToast } from '@/components/ui/use-toast'
import { Typography } from '@/components/ui/typography'
import { Switch } from '@/components/ui/switch'

interface FeatureFlagListProps {
  featureFlags: FeatureFlag[]
}

export const FeatureFlagList = ({ featureFlags }: FeatureFlagListProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const onSwitchChange = async (value: boolean, flag: FeatureFlag) => {
    // Let UI optimistically update, show toast and refresh if error
    try {
      await updateFeatureFlag({
        ...flag,
        description: flag.description || undefined, // Again sanitize undefined - TODO: find a better way to type this
        isActive: value,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'There was an error updating the feature flag',
        variant: 'destructive',
      })
    }
    router.refresh()
  }

  return (
    <>
      {featureFlags.map((flag) => (
        <div
          key={flag.id}
          className="w-full flex flex-row gap-4 justify-between items-center"
        >
          <div>
            <Typography variant="h4">{flag.name}</Typography>
            <Typography variant="pn">{flag.description}</Typography>
          </div>
          <Switch
            defaultChecked={flag.isActive}
            onCheckedChange={(value) => onSwitchChange(value, flag)}
          />
        </div>
      ))}
    </>
  )
}
