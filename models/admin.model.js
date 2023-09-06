const mongoose = require('mongoose')

const Admins = new mongoose.Schema(
    {
        firstname: {
            type: "string", 
            required: true, 
            trim:true
        },
        surname: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        email: {
            type: "string", 
            required: true, 
            unique: true, 
            trim:true,
        },
        password: {
            type: "string", 
            required: true,
        },
        phone:{
            type: "string", 
            required: true,
        },
        role: {
            type: "string", 
            required: true,
            default: "Nurse",
        },
        created_at: {
            type: Date,
            default: Date.now()
        } 
    }
)

module.exports = mongoose.model('Admins', Admins)