import { generateComponents } from '@uploadthing/react'

import type { UploadThingFileRouter } from '@/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<UploadThingFileRouter>()
