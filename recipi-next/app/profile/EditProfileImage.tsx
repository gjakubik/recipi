'use client'

import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils'
import { UploadThingFileRouter } from '@/app/api/uploadthing/core'

import { UploadButton } from '@/utils/uploadthing'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera, Save } from 'lucide-react'

interface EditProfileImageProps {
  image: string | null
  name: string | null
}

export const EditProfileImage = ({ image, name }: EditProfileImageProps) => {
  const [hovering, setHovering] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const isActive = imageUrl || hovering

  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={() => setHovering(true)}
        onTouchEnd={() => setHovering(false)}
      >
        <div className="flex h-full w-full items-center justify-center">
          {imageUrl ? (
            <Button>
              <Save /> Save
            </Button>
          ) : (
            <UploadButton<'profileImage'>
              appearance={{
                button:
                  'w-22 text-accent-foreground bg-slate-50/50 bg hover:bg-accent hover:text-accent-foreground h-8 px-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                allowedContent: 'hidden',
              }}
              content={{
                button: (ctx) => {
                  return (
                    <div className="flex flex-row items-center gap-2">
                      <Camera className="h-6 w-6" />
                      Edit
                    </div>
                  )
                },
              }}
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                console.log(res)
                setImageUrl(res[0].url)
              }}
            />
          )}
        </div>
      </div>

      <Avatar
        className={cn(
          'relative z-10 h-28 w-28 transition-all duration-300 ease-in-out',
          hovering && 'blur-sm'
        )}
      >
        <AvatarImage
          src={imageUrl || image || undefined}
          alt={name || "User Name's profile image"}
          className=""
        />
        <AvatarFallback>{name ? getInitials(name) : 'ME'}</AvatarFallback>
      </Avatar>
    </div>
  )
}
