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
import { useModal } from '@/providers/modal-provider'

import React from 'react'


type Props = {
  title: string
  subheading: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const CustomModal = ({ children, subheading, title, defaultOpen }: Props) => {
  const { isOpen, setClose } = useModal()
  const handleClose = () => setClose()

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      >
      <DrawerContent>


        <DrawerHeader>
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          {/* <DrawerDescription >
           
          </DrawerDescription> */}
          <div className="text-center flex flex-col items-center gap-4 h-96 overflow-scroll">
          {subheading}
          {children}
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
          <DrawerClose>
            <div
              className="w-full p-2 rounded-md hover:bg-gray-100"
              onClick={handleClose}
            >
              Close
            </div>
          </DrawerClose>
        </DrawerFooter>


        
      </DrawerContent>
    </Drawer>
  )
}

export default CustomModal