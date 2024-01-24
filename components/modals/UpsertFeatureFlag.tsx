'use client'

import { PropsWithChildren, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FeatureFlag } from '@/types'
import { useForm } from 'react-hook-form'
import {
  featureFlagFormSchema,
  FeatureFlagFormValues,
} from '@/lib/validations/featureFlag'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFeatureFlag, updateFeatureFlag } from '@/lib/db/api'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Typography } from '@/components/ui/typography'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { FormInput } from '@/components/FormInput'

interface UpsertFeatureFlagModalProps extends PropsWithChildren {
  existingFeatureFlag?: FeatureFlag
}

export const UpsertFeatureFlagModal = ({
  existingFeatureFlag,
  children,
}: UpsertFeatureFlagModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<FeatureFlagFormValues>({
    resolver: zodResolver(featureFlagFormSchema),
    defaultValues: !!existingFeatureFlag
      ? {
          ...existingFeatureFlag,
          description: existingFeatureFlag.description || undefined, // sanitize null to undefined
        }
      : {
          name: '',
          description: '',
          isActive: false,
        },
  })

  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleFormSubmit = async (values: FeatureFlagFormValues) => {
    setIsSaving(true)
    console.log(values)
    try {
      const upsertedFeatureFlag = existingFeatureFlag
        ? await updateFeatureFlag(values)
        : await createFeatureFlag(values)
      toast({
        title: 'Success',
        description: `Feature Flag ${upsertedFeatureFlag.name} ${
          existingFeatureFlag ? 'updated' : 'created'
        }`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
      setIsSaving(false)
      return
    }
    router.refresh()
    setIsSaving(false)
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upsert Feature Flag</DialogTitle>
            <DialogDescription>
              This is a modal for upserting a feature flag.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput
                label="Name"
                name="name"
                placeholder="Feature Flag Name"
                className="w-full"
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Feature Flag Description"
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Set as active upon creation</FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2 items-center justify-end">
                {form.formState.isDirty && (
                  <Button
                    type="reset"
                    variant="ghost"
                    disabled={isSaving}
                    onClick={() => form.reset()}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isSaving || !form.formState.isDirty}
                >
                  {existingFeatureFlag ? 'Save' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
