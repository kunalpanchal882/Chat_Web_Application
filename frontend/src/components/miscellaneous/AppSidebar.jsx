import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/store/Axios";
import ChatLoading from "../ChatLoading";
import UserList from "../useravatar/UserList";
import { ChatState } from "@/context/ChatProvider";
import { Spinner } from "../ui/spinner";



export function AppSidebar() {
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();

 const {user,setselectedChat,chats, setchats} = ChatState()

const {setOpen} = useSidebar()
 

  const handelSearch = async () => {
    console.log("hello");
    console.log(search);

    if (!search) {
      toast.error("search field not be empity");
      return
    }

    try {
      setloading(true);
      const res = await axiosInstance.get(`/user?search=${search}`);
      console.log(res.data);
      setsearchResult(res.data);
      console.log("serach result", searchResult);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error("failed to search user");
    }
  };

  const accessChat = async(userId) => {
    try {
      setloadingChat(true)
      const {data} = await axiosInstance.post('/chat/',{userId})
      console.log("acces chat",data);
      if(!chats.find((c) => c._id === data._id))setchats([data,...chats])
      setselectedChat(data)
      setloadingChat(false)
      setOpen(false)
    } catch (error) {
        console.log(error);
        toast.error("error occure in acces this user chat")
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex justify-between">
                <input
                  placeholder="Search user here"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  className="p-2 border-2 border rounded-xl   outline-none  focus:ring-1 focus:border-ring focus:ring-ring/30"
                />
                <button
                  onClick={handelSearch}
                  className="flex items-center cursor-pointer bg-white hover:bg-[#E5E4E2] text-black p-2 rounded-xl"
                >
                  <Search />
                </button>
              </div>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                <UserList
                    key={user._id}
                    user={user}
                    handelFunction={() => accessChat(user._id)}
                />
                ))
              )}
              
              {loadingChat && <Spinner className="w-full mt-8 h-8"/>}
              {/* <ChatLoading/> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
