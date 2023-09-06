const {Router} = require('express')

const {
    getHome,
    getPatient,
    getRegion,
    getNurse,
} = require('../controls/pagesControls')

const {
    createNurse,
    updateNurse,
    deleteNurse,
    createRegion,
    updateRegion,
    deleteRegion,
    createPatient,
    updatePatient,
    deletePatient,
} = require('../controls/crudControls')

const router = Router()

router.get('/', getHome)

router.get('/patient', getPatient)
router.post('/patient/create', createPatient)
router.post('/patient/update/:id', updatePatient)
router.post('/patient/delete/:id', deletePatient)

router.get('/region', getRegion)
router.post('/region/create', createRegion)
router.post('/region/update/:id', updateRegion)
router.post('/region/delete/:id', deleteRegion)

router.get('/nurse', getNurse)
router.post('/nurse/create', createNurse)
router.post('/nurse/update/:id', updateNurse)
router.post('/nurse/delete/:id', deleteNurse)

module.exports = router









