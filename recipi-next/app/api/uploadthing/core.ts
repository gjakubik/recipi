import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { getCurrentUser } from '@/lib/session'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  titleImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getCurrentUser()

      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      // TODO: This is where we want db code saving the file info to the db

      console.log('file info', file)
      console.log('file url', file.url)
    }),

  profileImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getCurrentUser()
      if (!user) throw new Error('Unauthorized')
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      // TODO: This is where we want db code saving the file info to the db

      console.log('file info', file)
      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type UploadThingFileRouter = typeof uploadThingFileRouter
