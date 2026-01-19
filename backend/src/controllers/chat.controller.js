const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");

async function accessChat(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "UserId not provided",
      });
    }

    // 🔍 Check if chat already exists
    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      return res.status(200).json(isChat[0]);
    }

    // 🆕 Create new chat
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await chatModel.create(chatData);

    const fullChat = await chatModel
      .findById(createdChat._id)
      .populate("users", "-password");

    return res.status(200).json(fullChat);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function fetchAllChats(req,res) {
    try {
        chatModel.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updateAt:-1})
        .then(async(result) => {
            const results = await userModel.populate(result,{
                path:"latestMessage.sender",
                select:"name pic email"
            })
            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
}

async function createGroupChat(req,res) {
    if(!req.body.users || !req.body.name){
        return res.status(400).json({message:"please fill all the field"})
    }

    let users = JSON.parse(req.body.users);

    if(users.lentgh<2){
        return res.status(400).json({message:"group should have more than two users"})
    }

    users.push(req.user)

    try {
        const groupChat = await chatModel.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        })

        const fetchGroupChat = await chatModel.findOne({_id:groupChat._id})
          .populate("users","-password")
          .populate("groupAdmin","-password")
        res.status(200).json(fetchGroupChat)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }

}

async function renameGroup(req,res) {
    const {chatId,chatName} = req.body

    const updateChat = await chatModel.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new:true
        }
    ).populate("users","-password").populate("groupAdmin","-password")

    if(!updateChat){
        res.status(404);
        throw new Error(error.message)
    }else{
        res.status(200).json(updateChat)
    }

}

async function addGroupMember(req,res) {
  const {chatId,userId} = req.body

  const added = await chatModel.findByIdAndUpdate(
    chatId,
    {
      $push:{users:userId}
    },
    {
      new:true
    }
  ).populate("users","-password").populate("groupAdmin","-password")

  if(!added){
    res.status(404);
    throw new Error("chat Not found")
  }else{
    res.json(added)
  }
}

async function removeGroupMember(req,res) {
  const {chatId,userId} = req.body

  const removed = await chatModel.findByIdAndUpdate(
    chatId,
    {
      $pull:{users:userId}
    },
    {
      new:true
    }
  ).populate("users","-password").populate("groupAdmin","-password")

  if(!removed){
    res.status(404);
    throw new Error("chat Not found")
  }else{
    res.json(removed)
  }
}

module.exports = {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  addGroupMember,
  removeGroupMember
};
