const mongoose = require('mongoose')

const Nurses = new mongoose.Schema(
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
        phone:{
            type: "string", 
            required: true,
        },
        role: {
            type: "string", 
            required: true,
            default: "Xamshira"
        },
        created_at: {
            type: Date,
            default: Date.now()
        } 
    }
)

module.exports = mongoose.model('Nurses', Nurses)