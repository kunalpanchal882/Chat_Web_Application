import React from 'react'
import Message from './Message'
import Chatsidebar from './Chatsidebar'

const Chatui = () => {
  return (
    <div className='flex gap-3'>
        <Chatsidebar/>
        <Message/>
    </div>
  )
}

export default Chatui