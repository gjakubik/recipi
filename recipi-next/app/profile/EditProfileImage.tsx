'use client'

import 'react-image-crop/dist/ReactCrop.css'

import { useState, useRef } from 'react'
import { cn, getInitials } from '@/lib/utils'
import { UploadThingFileRouter } from '@/app/api/uploadthing/core'
import type { Crop, PixelCrop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'

import { UploadButton, useUploadThing } from '@/utils/uploadthing'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera, Save } from 'lucide-react'
import { ProfileImageCropper } from './ProfileImageCropper'

interface EditProfileImageProps {
  image: string | null
  name: string | null
}

export const EditProfileImage = ({ image, name }: EditProfileImageProps) => {
  const [hovering, setHovering] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  return (
    <>
      {imageUrl ? (
        <ProfileImageCropper src={imageUrl} />
      ) : (
        <div className="relative">
          <div
            className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onTouchStart={() => setHovering(true)}
            onTouchEnd={() => setHovering(false)}
          >
            <div className="flex h-full w-full items-center justify-center">
              <label
                htmlFor="profile-file-input"
                className="flex w-fit flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <input
                  id="profile-file-input"
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const reader = new FileReader()
                    reader.onload = () => {
                      const originalDataUrl = reader.result?.toString() ?? ''
                      // Resize the image to 150px width
                      resizeImage(originalDataUrl, 150, (resizedDataUrl) => {
                        setImageUrl(resizedDataUrl)
                      })
                    }
                    reader.readAsDataURL(file)
                  }}
                />
                <Camera className="h-5 w-5" />
                Edit
              </label>
            </div>
          </div>
          <Avatar
            className={cn(
              'relative z-10 h-28 w-28 transition-all duration-300 ease-in-out',
              hovering && 'blur-sm'
            )}
          >
            <AvatarImage
              src={image || undefined}
              alt={name || "User Name's profile image"}
              className=""
            />
            <AvatarFallback>{name ? getInitials(name) : 'ME'}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  )
}

const resizeImage = (
  dataUrl: string,
  maxWidth: number,
  callback: (resizedDataUrl: string) => void
) => {
  const img = new Image()
  img.src = dataUrl
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const scale = maxWidth / img.width
    canvas.width = maxWidth
    canvas.height = img.height * scale

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const resizedDataUrl = canvas.toDataURL('image/jpeg')
    callback(resizedDataUrl)
  }
}
