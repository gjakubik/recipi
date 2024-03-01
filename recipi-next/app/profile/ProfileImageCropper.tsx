/* eslint-disable @next/next/no-img-element */
'use client'

import 'react-image-crop/dist/ReactCrop.css'

import { useRef, useState } from 'react'
import type { Crop, PixelCrop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import { updateProfilePicture } from '@/lib/db/api'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useUploadThing } from '@/utils/uploadthing'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Save } from 'lucide-react'

export function ProfileImageCropper(props: { src?: string }) {
  const user = useCurrentUser()
  const { isUploading, startUpload } = useUploadThing('profileImage', {
    /**
     * @see https://docs.uploadthing.com/api-reference/react#useuploadthing
     */
    async onClientUploadComplete(res) {
      console.log('Client upload complete', res)
      const fileUrl = res?.[0]?.url
      if (fileUrl && user) {
        await updateProfilePicture(user.id, fileUrl)
        window && window.location.reload()
      }
    },
  })

  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 150,
    height: 150,
    x: 0,
    y: 0,
  })
  const [storedCrop, setStoredCrop] = useState<PixelCrop>()
  const imageRef = useRef<HTMLImageElement>(null)

  async function uploadImage() {
    if (!imageRef.current || !storedCrop) return
    const canvas = cropImage(imageRef.current, storedCrop)

    const blob = await new Promise<Blob>((res, rej) => {
      canvas.toBlob((blob) => {
        blob ? res(blob) : rej('No blob')
      })
    })
    const file = new File([blob], 'cropped.png', { type: 'image/png' })

    await startUpload([file])
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {props.src ? (
        <ReactCrop
          aspect={1}
          crop={crop}
          circularCrop
          onChange={(_, percent) => setCrop(percent)}
          onComplete={(c) => setStoredCrop(c)}
        >
          <img ref={imageRef} src={props.src} alt="Crop me" height={400} />
        </ReactCrop>
      ) : (
        <p>No image selected</p>
      )}

      <Button
        variant="outline"
        className="flex flex-row gap-2"
        onClick={() => void uploadImage()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Progress className="h-5 w-5" />
        ) : (
          <Save className="h-5 w-5" />
        )}
        {isUploading ? 'Uploading...' : 'Save'}
      </Button>
    </div>
  )
}

function cropImage(image: HTMLImageElement, crop: PixelCrop) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No 2d context')

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  ctx.restore()

  return canvas
}
