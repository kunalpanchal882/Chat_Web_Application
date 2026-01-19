import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ChatState } from "@/context/ChatProvider";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { axiosInstance } from "@/store/Axios";
import { Spinner } from "../ui/spinner";
import UserList from "../useravatar/UserList";
import UserBadgeItem from "../useravatar/UserBadgeItem";

const GrooupChatModel = () => {
  const [search, setsearch] = useState("");
  const [groupChatName, setgroupChatName] = useState();
  const [searchResult, setsearchResult] = useState([]);
  const [selectedUser, setselectedUser] = useState([]);
  const [loading, setloading] = useState(false);

  const { user, chats, setchats } = ChatState();

  const handelSearch = async (query) => {
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
 
  const handelGroup = (addToUser) => {
    if(selectedUser.includes(addToUser)){
         toast.error("User already added")
         return;
    }

    setselectedUser([...selectedUser,addToUser])
  };

  const handelDelete =(delUSer) => {
    setselectedUser(selectedUser.filter(sel => sel._id !== delUSer._id))
  }

  const handelSubmit = async() => {
    if(!groupChatName || !selectedUser){
        toast.error("please fill all the field")
        return
    }

    try {
        setloading(true)
        const {data} = await axiosInstance.post ("/chat/creategroup",{
            name:groupChatName,
            users:JSON.stringify(selectedUser.map(u => u._id))
        })
        console.log(data);
        setchats([data,...chats])
        setloading(false)
        toast.success("New group created successfully")
    } catch (error) {
        console.log(error);
        toast.error("error in creating group")
    }

  };

  return (
    <Dialog>
      <DialogTrigger>
        <CirclePlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Groups</DialogTitle>
          <DialogDescription>select users to create group</DialogDescription>
          <form className="flex flex-col gap-5">
            <Input
              placeholder="Name of Group"
              onChange={(e) => setgroupChatName(e.target.value)}
            />
            <Input
              placeholder="Add users "
              onChange={(e) => handelSearch(e.target.value)}
            />
          </form>
            {/* reneder slected user */}
            <div>
                {selectedUser?.map((u) => (
                    <UserBadgeItem key={u._id} user={u} handelDelete={() => handelDelete(u)}/>
                ))}
            </div>
            {/* render the users */}
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
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handelSubmit}>
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GrooupChatModel;
