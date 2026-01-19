import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Bold } from "lucide-react";

const UserList = ({ user, handelFunction }) => {
  return (
    <div
      onClick={handelFunction}
      className="mt-2 bg-[#353839] rounded-xl p-1 flex gap-2 items-center"
    >
      <Avatar>
        <AvatarImage src={user.pic} alt="/image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="flex flex-col gap-1">
        <h3>{user.name}</h3>
        <p className="text-gray-400 flex gap-1 text-[clamp(0.6rem,2vw,0.7rem)]">
            <span className="font-medium text-gray-300">Email</span>
            <span>:</span>
            <span>
            {user.email}
            </span>
        </p>
      </span>
    </div>
  );
};

export default UserList;
