const express = require('express')
const errorHandelr = require('./middlewares/errorMiddleware')
const cors = require('cors')
const cookieParser = require("cookie-parser")

// IMPORT ROUTES HERE
const authRoute = require('./Routers/user.route')
const chatRoute = require('./Routers/chat.route')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/user",authRoute)
app.use('/api/chat',chatRoute)

app.use(errorHandelr.notFound)
app.use(errorHandelr.errorHandler)


module.exports = app