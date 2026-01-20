import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getSender } from "@/config/Chatlogics";
import { ChatState } from "@/context/ChatProvider";
import { ArrowLeft, CircleEllipsis, MessageSquareLock } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const SingleChat = () => {
  const { selectedChat, setselectedChat, user, fetchAgain, setfetchAgain } =
    ChatState();


  return (
    <>
      {selectedChat ? (
        <>
          <header className="mx-3 flex gap-5 justify-between items-center">
            <Button onClick={() => setselectedChat("")}>
              <ArrowLeft />
            </Button>
            {selectedChat.isGroupChat ? (
              <div className="flex gap-2 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src="../../public/group_image.png" />
                    <AvatarFallback>GC</AvatarFallback>
                  </Avatar>
                  <h2>{selectedChat.chatName}</h2>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={getSender(user,selectedChat.users).pic} />
                    <AvatarFallback>GC</AvatarFallback>
                  </Avatar>
                  <h2>{getSender(user,selectedChat.users).name}</h2>
                </div>
              </div>
            )}
            <CircleEllipsis />
          </header>
          <Separator />
        </>
      ) : (
        <div className="flex flex-col h-full items-center justify-center">
          <span>
            <Skeleton className="h-20 w-20 w-ffull flex items-center justify-center animate-bounce">
              <MessageSquareLock size={50} className="opacity-40" />
            </Skeleton>
          </span>
          <p className="opacity-50 text-2xl">Click on User to Start the Chat</p>
        </div>
      )}
    </>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Card Title</CardTitle>
    //     <CardDescription>Card Description</CardDescription>
    //     <CardAction>Card Action</CardAction>
    //   </CardHeader>
    //   <CardContent>
    //     <p>sinl</p>
    //   </CardContent>
    //   <CardFooter>
    //     <p>Card Footer</p>
    //   </CardFooter>
    // </Card>
  );
};

export default SingleChat;
