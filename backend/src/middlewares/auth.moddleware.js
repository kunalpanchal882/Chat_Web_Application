const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authmiddleware(req,res,next) {
    console.log("heelo this is auth middleware");
    
    try {
        const {token} = req.cookies || req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message:"Not authozised, token not provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await userModel.findById(decoded.id).select("-password")

        next()

    } catch (error) {
        res.status(401);
        throw new Error("unauthorised user")
    }
}

module.exports = authmiddleware