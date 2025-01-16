import React from 'react'

type Props = {children: React.ReactNode}

const layout = ({children}: Props) : JSX.Element => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
    {children}
    </div>
  )
}

export default layout