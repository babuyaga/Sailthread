'use client'
import React from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
  userImage: string | null
  onDelete?: any
  onUpload: any
}

// const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {

const ProfilePicture = () => {
  const router = useRouter()

  const onRemoveProfileImage = async () => {
    // const response = await onDelete()
    // if (response) {
    //   router.refresh()
    // }
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-lg dark:text-white text-black"> Profile Picture</p>
      <div className="w-24 h-24 dark:bg-white bg-black rounded">

      </div>
    </div>
  )
}

export default ProfilePicture