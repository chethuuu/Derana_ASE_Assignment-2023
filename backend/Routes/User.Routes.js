const router = require('express').Router()
const userController = require('../Controllers/User.Controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken)
router.get('/', userController.getUser)

module.exports = router