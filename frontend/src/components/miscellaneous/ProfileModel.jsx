import React from "react";
import { CircleEllipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const ProfileModel = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <CircleEllipsis />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.name}'s Info</DialogTitle>
          <div className="flex justify-between gap-4 mt-3">
            <Avatar >
              <AvatarImage className="w-40" src={user.pic} />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            <span className="flex flex-col justify-center items-start h-full w-60 md:w-full">
                <p className="flex  text-[0.7rem] md:text-[1.2rem]"><b>Name :</b> {user.name}</p>
                <p className="text-[0.7rem]  md:text-[1.2rem]"><b>Email : </b>{user.email}</p>
            </span>
          </div>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModel;
