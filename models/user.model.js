const mongoose = require('mongoose')

const Users = new mongoose.Schema(
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
        lastname: {
            type: "string", 
            required: true, 
            trim:true, 
        },
        passportSeriaNumber: {
            type: "string",
            required: true,
            trim: true,
        },
        password: {
            type: "string", 
            required: true,
        },
        phone:{
            type: "string", 
            required: true,
            unique: true,
        },
        role: {
            type: "string",     // StarAdmin, Admin, Nurse, 
            required: true,
            // default: "Nurse",
        },
        job: {
            type: "string",    
            required: true, 
            // default: "Nurse",
        },
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Regions",
        },
        createdAt: {
            type: String, 
            default: Date.now(),
        },  
    }
)

module.exports = mongoose.model('Users', Users)