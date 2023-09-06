const Admins = require('../models/admin.model')
const Childrens = require('../models/children.model')
const Nurses = require('../models/nurse.model')
const Patients = require('../models/patient.model')
const Regions = require('../models/region.model')


const createNurse = async(req, res) => {
    try {
        await Nurses.create(req.body)
        res.redirect('/nurse')
    } catch (error) {
        console.log(error)
    }
}
const updateNurse = async(req, res) => {
    try {
        await Nurses.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/nurse')
    } catch (error) {
        console.log(error)
    }
}
const deleteNurse = async(req, res) => {
    try {
        await Nurses.findByIdAndDelete(req.params.id)
        res.redirect('/nurse')
    } catch (error) {
        console.log(error)
    }
}


const createRegion = async(req, res) => {
    try {
        await Regions.create(req.body)
        console.log(req.body)
        res.redirect('/region')
    } catch (error) {
        console.log(error)
    }
}
const updateRegion = async(req, res) => {
    try {
        await Regions.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/region')
    } catch (error) {
        console.log(error)
    }
}
const deleteRegion = async(req, res) => {
    try {
        await Regions.findByIdAndDelete(req.params.id)
        res.redirect('/region')
    } catch (error) {
        console.log(error)
    }
}

const createPatient = async(req, res) => {
    try {
        const {weeks} = req.body
        const dateStart = new Date()
        const dateEnd = new Date()
        dateStart.setDate( dateStart.getDate() - +weeks * 7 )
        dateEnd.setDate( dateStart.getDate() + 9 * 30 + 9 )

        await Patients.create({...req.body, dateStart, dateEnd})
        res.redirect('/patient')
    } catch (error) {
        console.log(error)
    }
}
const updatePatient = async(req, res) => {
    try {
        await Patients.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/patient')
    } catch (error) {
        console.log(error)
    }
}
const deletePatient = async(req, res) => {
    try {
        await Patients.findByIdAndDelete(req.params.id)
        res.redirect('/patient')
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createNurse,
    updateNurse,
    deleteNurse,
    createRegion,
    updateRegion,
    deleteRegion,
    createPatient,
    updatePatient,
    deletePatient,
}