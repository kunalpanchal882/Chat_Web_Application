require('dotenv').config()
const app = require('./src/app')
const connectDb = require('./src/db/db')
// const errorHandelr = require('./src/middlewares/errorMiddleware')

connectDb()

// app.use(errorHandelr.notFound)
// app.use(errorHandelr.errorHandler)

app.listen(3000,() => {
    console.log("server is running on port 3000");
})