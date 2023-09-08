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
        const total = await Patients.countDocuments()
        const limit = req.query.limit || 10
        const page = req.query.page || 1

        const region = req.query.region || undefined 
        const status = req.query.status || undefined 

        const week = req.query.week || undefined 
        const month = req.query.month || undefined 
        const year = req.query.year || undefined 
        const dateStart = req.query.dateStart || undefined 
        const dateEnd = req.query.dateEnd || undefined 

        const patients = await Patients.find(
            {
                // address: region,
                // status: "tug'gan"
            })
            .sort({createdAt: -1})
            .skip((page * limit) - limit)
            .limit(limit)
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
            regions,
            pagination: {
                page,
                limit,
                pageCount: Math.ceil(total/limit)
            },
        })
    } catch (error) {
        console.log(error)
    }
}

const getRegion = async(req, res) => {
    try {
        const total = await Regions.countDocuments()
        const limit = req.query.limit || 20
        const page = req.query.page || 1

        let regions

        if(req.query.search){
            regions = await Regions.find({
                    $or: [
                        { title: new RegExp(req.query.search, "gi") },
                    ],
                })
                .sort({createdAt: -1})
                .skip((page * limit) - limit)
                .limit(limit)
                .populate('nurses')
                .lean()
        }else{
            regions = await Regions.find()
                .sort({createdAt: -1})
                .skip((page * limit) - limit)
                .limit(limit)
                .populate('nurses')
                .lean()
        }

        const users = await Users.find().lean()

        res.render('region', {
            title: 'Mahallalar',
            regions,
            nurses: users,
            pagination: {
                page,
                limit,
                pageCount: Math.ceil(total/limit)
            },
            search: req.query.search
        })
    } catch (error) {
        console.log(error)
    }
}

const getNurse = async(req, res) => {
    try {
        const total = await Users.countDocuments()
        const limit = req.query.limit || 20
        const page = req.query.page || 1

        let users

        if(req.query.search){
            users = await Users.find({
                    $or: [
                        { lastname: new RegExp(req.query.search, "gi") },
                        { surname: new RegExp(req.query.search, "gi") },
                        { firstname: new RegExp(req.query.search, "gi") },
                        { phone: new RegExp(req.query.search, "gi") },
                    ],
                })
                .sort({createdAt: -1})
                .skip((page * limit) - limit)
                .limit(limit)
                .populate('region')
                .lean()
        }else{
            users = await Users.find({role: 'Nurse'})
                .sort({createdAt: -1})
                .skip((page * limit) - limit)
                .limit(limit)
                .populate('region')
                .lean()
        }

        const regions = await Regions.find().lean()

        res.render('nurse', {
            title: 'Hamshiralar',
            nurses: users,
            regions,
            pagination: {
                page,
                limit,
                pageCount: Math.ceil(total/limit)
            },
            search: req.query.search
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