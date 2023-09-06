const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        console.log(`Connected DB: ${process.env.MONGO_URI}`)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB