const {Router} = require('express')

const {
    getLogin,
    userLogin,
    userLogout
} = require('../controls/authControls')

const router = Router()

router.get('/login', getLogin)
router.post('/login', userLogin)
router.post('/logout', userLogout)

module.exports = router 









