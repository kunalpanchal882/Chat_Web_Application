import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { ChatState } from "@/context/ChatProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input"

const ProfilePopUp = ({user}) => {

  //  const {user} = ChatState()

  return (
    <Dialog >
  <DialogTrigger className="pl-2 cursor-pointer">
      Profile
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit your profile</DialogTitle>
      <div className="w-full flex gap-2 mt-3">
        <span className="w-1/2">
            <img className="object-cover rounded-full w-25 h-25" src={user.pic}  />
        </span>
        <div className="w-full flex flex-col gap-2">
            <span className="w-full flex gap-2 items-center">
                <p className="w-1/3 text-sm">Your Name</p>
                <Input type="text" value={user.name}/>
            </span>
            <span className="w-full flex gap-2 items-center">
                <p className="w-1/3 text-sm">Your email</p>
                <Input type="text" value={user.email}/>
            </span>
            
        </div>
      </div>
      
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  );
};

export default ProfilePopUp;
