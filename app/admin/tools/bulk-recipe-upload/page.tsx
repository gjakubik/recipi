import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { BulkUploadForm } from '@/components/forms/BulkUploadForm'

export default async function BulkRecipeUpload() {
  const user = await getCurrentUser()

  //redirect to home if not logged in
  if (!user) {
    return <Typography>Please log in to create a recipe</Typography>
  }

  return (
    <>
      <Typography variant="h2">Bulk Recipe Upload</Typography>
      <BulkUploadForm user={user} />
    </>
  )
}
