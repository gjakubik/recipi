import {
  generateUploadDropzone,
  generateUploadButton,
  generateReactHelpers,
} from '@uploadthing/react'

import type { UploadThingFileRouter } from '@/app/api/uploadthing/core'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadThingFileRouter>()

export const UploadDropzone = generateUploadDropzone<UploadThingFileRouter>()

export const UploadButton = generateUploadButton<UploadThingFileRouter>()
