const Admins = require('../models/admin.model')
const Childrens = require('../models/children.model')
const Nurses = require('../models/nurse.model')
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
        const patients = await Patients.find().populate('address').lean()
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
        const nurses = await Nurses.find().lean()
        res.render('region', {
            title: 'Mahallalar',
            regions,
            nurses
        })
    } catch (error) {
        console.log(error)
    }
}

const getNurse = async(req, res) => {
    try {
        const nurses = await Nurses.find().lean()
        res.render('nurse', {
            title: 'Hamshiralar',
            nurses
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