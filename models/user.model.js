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
            enum: ['StarAdmin', 'Admin', 'Nurse']
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
            required: function() {
                return this.role !== 'Nurse';
            }
        },
        createdAt: {
            type: Date, 
            default: Date.now(), 
        },  
    }
)

Users.pre('save', function(next) {
    if (this.role !== 'Nurse' && this.region) {
        this.region = undefined; 
    }
    next();
});

// Users.pre('findByIdAndUpdate', function(next) {
//     if (this._update && this._update.role !== 'Nurse') {
//         if (this._update.region) {
//             delete this._update.region;
//         }
//     }
//     next();
// });

Users.pre('findOneAndUpdate', function(next) {
    if (this._update && this._update.role !== 'Nurse') {
        this._update.region = undefined;
        delete this._update.region;
    }
    next();
});





module.exports = mongoose.model('Users', Users)