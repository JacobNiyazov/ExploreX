const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')
const auth = require('../auth')


// router.post('/register', AuthController.registerUser)
// router.post('/login', AuthController.loginUser)
// router.post('/forgotPassword', AuthController.recoverPassword)
// router.put('/resetPassword', AuthController.resetUserPassword)
// router.put('/editAccount/:id', auth.verify, AuthController.editUserAccount)
// router.get('/logout', AuthController.logoutUser)
// router.get('/loggedIn', AuthController.getLoggedIn)

module.exports = router