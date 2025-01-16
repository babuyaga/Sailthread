import React from 'react'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'


type Props = {children: React.ReactNode}

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
     
        <Sidebar/>
  
          
        <div className="w-full  border-blue-600" >
          <div className="w-full"><InfoBar/></div>

          <div className="overflow-scroll w-full h-full flex">
            <div className="w-20"></div>
            {props.children}
          </div>
        </div>
    </div>
    
  )
}

export default Layout