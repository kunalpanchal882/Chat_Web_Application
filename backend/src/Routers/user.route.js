const express = require('express')
const authControoler = require('../controllers/auth.controller')
const authmiddleware = require('../middlewares/auth.moddleware')
const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router()

router.post('/register', upload.single('pic'),authControoler.userRegister)
router.post('/login',authControoler.userLogin)
router.get('/',authmiddleware,authControoler.searchAllUsers)

module.exports = router