import { PropsWithChildren } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface DrawerOrDialogProps extends PropsWithChildren {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  triggerChildren: React.ReactNode
}

export const DrawerOrDialog = ({
  title,
  description,
  isOpen,
  setIsOpen,
  triggerChildren,
  children,
}: DrawerOrDialogProps) => {
  const isSmallScreen = useMediaQuery(840)

  if (isSmallScreen) {
    return (
      <Drawer modal open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{triggerChildren}</DrawerTrigger>
        <DrawerContent>
          <DrawerClose />
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="mx-auto w-[90%]">{children}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerChildren}</DialogTrigger>
      <DialogContent className="w-full max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export const DrawerOrDialogFooter = ({ children }: PropsWithChildren) => {
  const isSmallScreen = useMediaQuery(840)

  if (isSmallScreen) {
    return <DrawerFooter>{children}</DrawerFooter>
  }

  return <DialogFooter>{children}</DialogFooter>
}
