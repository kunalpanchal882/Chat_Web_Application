const mongoose = require('mongoose')

async function connectDb() {
    try {
       await mongoose.connect(process.env.mogoose_url)
        console.log("connected to db suucessfully");
    } catch (error) {
        console.log("error in connecting db",error);
    }
}

module.exports = connectDb