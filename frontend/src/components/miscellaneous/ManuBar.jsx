import React, { useState } from "react";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { ChatState } from "@/context/ChatProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfilePopUp from "./ProfilePopUp";

const ManuBar = () => {
  const { user } = ChatState();
  //   const [openProfile, setOpenProfile] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
  console.log(user);
  

  const handelProfile = () => {
    console.log("heelo profile");
  };

  const handelLogout = () => {
    localStorage.clear(); // poora localStorage clear
    window.location.href = "/";
  };

  return (
    <div className="w-full flex justify-between p-3">
      <h1>The real chat</h1>

      <span className="flex gap-5 items-center pr-2">
        <Bell className="cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer" onClick={handelProfile}>
              <AvatarImage src={user.pic} alt="/image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProfilePopUp user={user}/> 
            <DropdownMenuItem onClick={handelLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </span>
    </div>
  );
};

export default ManuBar;
