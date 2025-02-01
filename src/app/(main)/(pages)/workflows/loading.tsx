import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="relative flex flex-col h-full">
   <h1 className="mt-5 sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 pb-3 pl-6 text-3xl backdrop-blur-lg">
      Loading
    </h1>
    <div className="w-full h-full flex flex-col align-middle justify-center">
    <Image src="/loading.gif" className="m-auto" alt="my gif" height={250} width={250} />
    </div>
    </div>
  )
}

export default LoadingScreen
