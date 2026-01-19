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

const Allchats = ({ chats, logedUser }) => {
  // if (!logedUser) return null

  console.log(logedUser);
  console.log(chats);

  return (
    <>
      {chats.map((chat) => (
        <div className="flex w-full max-w-lg flex-col gap-6 p-2" key={chat._id}>
          <Item variant="outline">
            {/* <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia> */}
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

              {/* <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>  */}
            </ItemContent>
          </Item>
        </div>
      ))}
    </>
  );
};

export default Allchats;
