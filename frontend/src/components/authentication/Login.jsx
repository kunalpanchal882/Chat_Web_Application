import React, { useState } from "react";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff ,Eye} from 'lucide-react';
import {toast} from "react-toastify" 
import { axiosInstance } from "@/store/Axios"; 
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { ChatState } from "@/context/ChatProvider";

const Login = () => {
    const { setUser } = ChatState();
    const [showPassword, setshowPassword] = useState(false)
      const [email, setemail] = useState();
      const [password, setpassword] = useState();
      const [loading, setloading] = useState(false)
      const navigate = useNavigate()

      const handelSubmit = async (e) => {
        e.preventDefault()

        if(!email || ! password){
          toast.error("email and password is required")
          return 
        }

        try {
          setloading(true)
          const res =await axiosInstance.post('/user/login',{
            email,
            password
          })
          console.log(res.data);
          toast.success("user login successfully")
          localStorage.setItem("userInfo",JSON.stringify(res.data))
          setUser(res.data); 
          navigate('/chat')
        } catch (error) {
          toast.error(error.response?.data?.message || "Internal server error")
        }finally{
          setloading(false)
        }

      }

  return (
    <Card >
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handelSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border border-border/40"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="border relative border-border/40 rounded-sm flex w-full items-center" >
                <Input
                id="password"
                type={showPassword ? "text" :"password"}
                required
                placeholder="**********"
                className="border-none w-full"
                onChange={(e) => setpassword(e.target.value)}
              />
              <span onClick={() => setshowPassword(!showPassword)} className="pr-3 absolute right-0">
                {showPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
              </span> 
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 ">
            {loading ? <Spinner/> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
