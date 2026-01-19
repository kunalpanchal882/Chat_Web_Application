import React, { useState } from "react";
import { AppWindowIcon, CodeIcon, ImageOff } from "lucide-react";
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
import { EyeOff, Eye, Camera } from "lucide-react";
import { axiosInstance } from "@/store/Axios";
import { Spinner } from "../ui/spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const navigate = useNavigate();

  const postdeatils = (pic) => {
    console.log(pic);

    if (!pic) return;

    if (!pic.type.startsWith("image/")) {
      toast.error("only image is allowed");
      return;
    }
    setloading(true);
    setImageUploaded(false);

    try {
      setTimeout(() => {
        setImage(pic);
        setImageUploaded(true);
        setloading(false);
      }, 600);
    } catch (error) {
      setloading(false), toast.error(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passsword and confirm password missmatch");
    }

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("pic", image);

    try {
      setloading(true);
      const res = await axiosInstance.post("/user/register", form);
      console.log(res.data);
      toast.success("user regisetr succesfully");
      localStorage.setItem("userInfo",JSON.stringify(res.data))
      navigate("/chat");
    } catch (error) {
      toast.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <Card >
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter all your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handelSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">name</Label>
              <Input
                id="name"
                type="name"
                placeholder="jhon-do"
                required
                className="border border-border/40"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
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
              <div className="border relative border-border/40 rounded-sm flex w-full items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="**********"
                  className="border-none w-full"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <span
                  onClick={() => setshowPassword(!showPassword)}
                  className="pr-3 absolute right-0"
                >
                  {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">confirm Password</Label>
              </div>
              <div className="border relative border-border/40 rounded-sm flex w-full items-center">
                <Input
                  id="confirmPassword"
                  type={showconfirmPassword ? "text" : "password"}
                  required
                  placeholder="**********"
                  className="border-none"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setshowconfirmPassword(!showconfirmPassword)}
                  className="pr-3 absolute right-0"
                >
                  {showconfirmPassword ? (
                    <Eye size={15} />
                  ) : (
                    <EyeOff size={15} />
                  )}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              {/* <div className="flex items-center">
                <Label htmlFor="image">Profile pic</Label>
              </div> */}
              <label
                htmlFor="image"
                className=" border flex justify-between min-h-[44px] bg-amber-50 p-2 text-black cursor-pointer relative border-border/40 rounded-sm flex w-full items-center w-full "
              >
                <input
                  id="image"
                  type="file"
                  placeholder="**********"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => postdeatils(e.target.files[0])}
                />
                {loading ? (
                  <div className="absolute w-full inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : image ? (
                  <p>{image.name}</p>
                ) : (
                  <span className="text-black text-sm flex justify-between w-full">
                    <p>Upload profile picture</p>
                    <Camera size={18} />
                  </span>
                )}
                {/* Camera icon */}
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4" >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
