import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="relative flex flex-col h-full">
    <h1 className="mt-4 sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-1.5 pl-6 text-3xl backdrop-blur-lg">
    <span className="my-auto">Loading...</span> </h1>
    <div className="w-full h-full flex flex-col align-middle justify-center">
    <Image src="/loading.gif" className="m-auto" alt="my gif" height={250} width={250} />
    </div>
    </div>
  )
}

export default LoadingScreen
