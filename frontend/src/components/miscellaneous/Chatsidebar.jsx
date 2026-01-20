import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ChatState } from "@/context/ChatProvider";
import { axiosInstance } from "@/store/Axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
// import { EllipsisVertical } from "lucide-react";
import { CirclePlus } from 'lucide-react';
import GrooupChatModel from "./GrooupChatModel";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Allchats from "./Allchats";



const Chatsidebar = () => {
  const [logedUser, setlogedUser] = useState();
  const { user, setselectedChat, chats,fetchAgain, setchats, selectedChat } = ChatState();

  const fetchChat = async () => {
    try {
      const { data } = await axiosInstance.get("/chat/");
      setchats(data);
    } catch (error) {
      console.log(error);
      toast.error("error in fetching the chats");
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);
    
    if (userInfo) {
      setlogedUser(JSON.parse(userInfo));
    }

    fetchChat();
  }, [fetchAgain]);

//   console.log(chats);
console.log("seleted chat",selectedChat);


  return (
    <Card className={` ${selectedChat ? "hidden" : "flex"} md:flex w-full max-w-sm`}>
      <CardHeader>
        <div className="w-full flex justify-between items-center mb-0">
          <CardTitle>Chats</CardTitle>
          <CardAction>
            <GrooupChatModel/>
          </CardAction>
        </div>
      </CardHeader>
      <CardDescription className="w-full px-2">
        <Input placeholder="search..." className="w-full" />
      </CardDescription>
      <CardContent className="p-0">
        <ScrollArea className="h-screen w-full rounded-md border">
          <Allchats chats={chats} logedUser={logedUser} setselectedChat={setselectedChat} selectedChat={selectedChat}/>
        </ScrollArea>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default Chatsidebar;
