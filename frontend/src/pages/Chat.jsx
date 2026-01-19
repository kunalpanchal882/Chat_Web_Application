import React from 'react'
import { AppSidebar } from '@/components/miscellaneous/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import ManuBar from '@/components/miscellaneous/ManuBar'
import Chatui from '@/components/miscellaneous/Chatui'

const Chat = () => {
  return (
    <div className='text-white h-20px w-full'>
      <SidebarProvider>
      <AppSidebar/>
      <SidebarTrigger/>
      <div className='w-full'>
        <ManuBar/>
        <Chatui/>
      </div>
      </SidebarProvider>
    </div>
  )
}

export default Chat