const Users = require('../models/user.model')
const Patients = require('../models/patient.model')
const Regions = require('../models/region.model')

const getHome = async(req, res) => {
    try {
        res.render('dashboard', {
            title: 'Dashboard',
        })
    } catch (error) {
        console.log(error)
    }
}

const getPatient = async(req, res) => {
    try {
        const patients = await Patients.find()
            .populate({
                path: 'address',
                populate: {
                    path: 'nurses',
                },
            })
            .lean()
            
        const regions = await Regions.find().populate('nurses').lean()

        res.render('patient', { 
            title: 'Bemorlar',
            patients,
            regions
        })
    } catch (error) {
        console.log(error)
    }
}

const getRegion = async(req, res) => {
    try {
        const regions = await Regions.find().populate('nurses').lean().exec()
        const users = await Users.find().lean()

        res.render('region', {
            title: 'Mahallalar',
            regions,
            nurses: users
        })
    } catch (error) {
        console.log(error)
    }
}

const getNurse = async(req, res) => {
    try {
        const users = await Users.find({role: 'Nurse'}).populate('region').lean()
        const regions = await Regions.find().lean()

        res.render('nurse', {
            title: 'Hamshiralar',
            nurses: users,
            regions,
        })
    } catch (error) {
        console.log(error)  
    }
}

module.exports = {
    getHome,
    getPatient,
    getRegion,
    getNurse,
    
}