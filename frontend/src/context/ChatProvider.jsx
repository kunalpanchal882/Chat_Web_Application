import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const navigate = useNavigate()
    const [selectedChat, setselectedChat] = useState()
    const [chats, setchats] = useState([])

    const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

    return (
        <ChatContext.Provider value={{user,setUser,selectedChat, setselectedChat,chats, setchats}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState =() => {
    return useContext(ChatContext)
}

export default ChatProvider