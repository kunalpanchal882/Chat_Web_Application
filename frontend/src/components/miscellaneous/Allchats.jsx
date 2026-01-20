import React from "react";
import { ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSender } from "@/config/Chatlogics";

const Allchats = ({ chats, logedUser ,setselectedChat}) => {
  // if (!logedUser) return null

  return (
    <>
      {chats.map((chat) => (
        <div
        onClick={() => setselectedChat(chat)} 
         className="flex w-full max-w-lg flex-col gap-6 p-2 cursor-pointer" key={chat._id}>
          <Item variant="outline">
            <ItemContent>
              {!chat.isGroupChat ? (
                <span className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={getSender(logedUser, chat.users).pic} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <ItemTitle>{getSender(logedUser, chat.users).name}</ItemTitle>
                </span>
              ) : (
                <span>
                  <ItemTitle>{chat.chatName}</ItemTitle>
                </span>
              )}
            </ItemContent>
          </Item>
        </div>
      ))}
    </>
  );
};

export default Allchats;
