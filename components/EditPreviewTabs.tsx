import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

interface EditPreviewTabsProps {
  title?: string
  children: React.ReactNode
}

export const EditPreviewTabs = ({ title, children }: EditPreviewTabsProps) => {
  return (
    <Tabs defaultValue="edit">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="h5">{title}</Typography>
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </Tabs>
  )
}
