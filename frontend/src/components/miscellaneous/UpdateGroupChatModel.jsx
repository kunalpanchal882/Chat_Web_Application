import { ChatState } from '@/context/ChatProvider'
import React, { useState } from 'react'
import { CircleEllipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
   DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { toast } from 'react-toastify';
import UserBadgeItem from '../useravatar/UserBadgeItem';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { axiosInstance } from '@/store/Axios';
import UserList from '../useravatar/UserList';

const UpdateGroupChatModel = () => {

   const {fetchAgain, setfetchAgain ,selectedChat, setselectedChat ,user} = ChatState()

   const [groupChatName, setgroupChatName] = useState()
   const [search, setsearch] = useState("")
   const [searchResult, setsearchResult] = useState([])
   const [loading, setloading] = useState(false)
   const [renameLoading, setrenameLoading] = useState(false)

   console.log("selected chats",selectedChat);
   

   const handleRemove = async(user1) => {
    console.log("hello bags");
    
     if(selectedChat.groupAdmin._id !== user._id  && user1._id !== user._id){
      toast.error("Only admin  can remove someone")
      return
    }

    try {
      setloading(true)
      const {data} = await axiosInstance.put("/chat/groupremove",{
        chatId:selectedChat._id,
        userId:user1._id
      })
     user1._id === user._id ? setselectedChat() : setselectedChat(data),
      setfetchAgain(!fetchAgain)
      setloading(false)
    } catch (error) {
      console.log(error);
      toast.error("error in removing new member") 
      setloading(false)
    }

   }

   const handelGroup = async(user1) => {
    if(selectedChat.users.find((u) => u._id === user1._id)){
      toast.error("user Already in group")
      return
    }

    if(selectedChat.groupAdmin._id !== user._id){
      toast.error("Only admin  can add someone")
      return
    }

    try {
      setloading(true)
      const {data} = await axiosInstance.put("/chat/groupadd",{
        chatId:selectedChat._id,
        userId:user1._id
      })
      setselectedChat(data),
      setfetchAgain(!fetchAgain)
      setloading(false)
    } catch (error) {
      console.log(error);
      toast.error("error in adding new member") 
      setloading(false)
    }
   }

   const handleRename = async() => {
    if(!groupChatName) return

    try {
      setrenameLoading(true)

      const {data} = await axiosInstance.put('/chat/',{
        chatId:selectedChat._id,
        chatName:groupChatName
      })
      setselectedChat(data),
      setfetchAgain(!fetchAgain),
      setrenameLoading(false)
    } catch (error) {
      console.log(error);
      toast.error("error in Rename group")
    }

    setgroupChatName(" ")

   }
   
   const handleSearch = async (query) => {
        setsearch(query);
        if (!query) return  
      try {
        setloading(true);
        const { data } = await axiosInstance.get(`/user?search=${query}`);
        console.log("search ", data);
        setloading(false);
        setsearchResult(data);
      } catch (error) {
        console.log(error);
        toast.error("error in serach user");
      }
    };

  return (
    <Dialog>
  <DialogTrigger><CircleEllipsis/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{selectedChat.chatName}</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
        <div>
          {selectedChat.users.map((u) => (
            <UserBadgeItem key={u._id} user={u} handelDelete={() => handleRemove(u)}/>
          ))}
        </div>
        <form className='my-2 flex gap-3'>
          <Input 
          placeholder="Chat name"
          value={groupChatName}
          onChange={(e) =>  setgroupChatName(e.target.value)}
          />
          <Button  onClick={handleRename}>
            {renameLoading ?  <Spinner/> : "Update"}
          </Button>
        </form>
        <form className='my-2'>
          <Input 
          placeholder="Add user to group"
          onChange={(e) =>  handleSearch(e.target.value)}
          />
        </form>
        <div>
          {loading ? (
              <Spinner className="w-full mt-3" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handelFunction={() => handelGroup(user)}
                  />
                ))
            )}
        </div>
        <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-red-600 hover:bg-red-400" onClick={() =>  handleRemove(user)}>Leave Group</Button>
          </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default UpdateGroupChatModel