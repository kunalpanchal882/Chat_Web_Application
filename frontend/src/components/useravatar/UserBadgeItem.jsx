import { Badge } from "../ui/badge";
import React from "react";
import { XIcon } from "lucide-react"

const UserBadgeItem = ({ user, handelDelete }) => {
  return (
    <Badge
      variant="secondary"
      className="bg-blue-500 text-white dark:bg-blue-600 mx-1 cursor-pointer"
      onClick={handelDelete}
    >
     {user.name}
     <XIcon />
    </Badge>
  );
};

export default UserBadgeItem;
