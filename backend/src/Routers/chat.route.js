const express = require('express')
const chatController = require('../controllers/chat.controller')
const authMiddleware = require('../middlewares/auth.moddleware')

const route = express.Router()

route.post('/',authMiddleware,chatController.accessChat)
route.get('/',authMiddleware,chatController.fetchAllChats)
route.post('/creategroup',authMiddleware,chatController.createGroupChat)
route.put('/',authMiddleware,chatController.renameGroup)
route.put('/groupadd',authMiddleware,chatController.addGroupMember)
route.put('/groupremove',authMiddleware,chatController.removeGroupMember)

module.exports = route