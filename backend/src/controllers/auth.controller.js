const userModel = require("../models/user.model");
const generateToken = require("../config/genratetoken");
const cloudStore = require("../services/store.service");

async function userRegister(req, res) {
  const { name, email, password } = req.body;

  console.log("name", name);
  console.log("email", email);
  console.log("password", password);
  console.log("file", req.file);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "please enter all the feilds" });
  }

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res.status(400).json({ message: "user already exist" });
  }

  let picURl = undefined;

  if (req.file) {
    const result = await cloudStore(req.file);
    picURl = result.url;
  }

  const user = await userModel.create({
    name,
    email,
    password,
    pic: picURl,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // true in production
    sameSite: "strict",
  });

  if (user) {
    res.status(201).json({
      mesage: "user regisetr successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Craete the USer");
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "User logged in successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function searchAllUsers(req, res) {
  try {
    console.log("heelo kunal");

     if (!req.query.search) {
      return res.status(200).json({message:"serach input not be empity"});
    }
    
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await userModel
      .find(keyword)
      .find({ _id: { $ne: req.user?._id } }) // exclude logged-in user
      .select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  userRegister,
  userLogin,
  searchAllUsers
};
