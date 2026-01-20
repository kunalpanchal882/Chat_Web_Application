import { ChatState } from '@/context/ChatProvider'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SingleChat from '../SingleChat'

const Message = () => {
 const {selectedChat} = ChatState()
  return (
    // <div >Message</div>
    <Card className={`${selectedChat ? "flex" : "hidden"} md:flex w-full mr-7 h-screen`}>
  <SingleChat/>
</Card>
  )
}

export default Message