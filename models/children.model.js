const mongoose = require('mongoose')

const Childrens = new mongoose.Schema(
    {
        firstname: {
            type: 'string',
            required: false,
        },
        surname: {
            type: 'string',
            required: false,
        },
        gender: {
            type: "string", 
            required: true, 
        }, 
        dateBirth: {
            type: Date,
            required: true, 
        },
        created_at: {
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = mongoose.model('Childrens', Childrens)