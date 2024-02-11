'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateFeatureFlag, deleteFeatureFlag } from '@/lib/db/api'
import { FeatureFlag } from '@/types'

import { useToast } from '@/components/ui/use-toast'
import { Typography } from '@/components/ui/typography'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { X } from 'lucide-react'

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
          <div className="flex flex-row gap-2 items-center">
            <Switch
              defaultChecked={flag.isActive}
              onCheckedChange={(value) => onSwitchChange(value, flag)}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <X />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Feature Flag</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this feature flag?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      try {
                        await deleteFeatureFlag(flag.id)
                        toast({
                          title: 'Success',
                          description: 'Feature flag deleted',
                        })
                      } catch (error) {
                        console.log(error)
                        toast({
                          title: 'Error',
                          description:
                            'There was an error deleting the feature flag',
                          variant: 'destructive',
                        })
                      }
                      router.refresh()
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </>
  )
}
