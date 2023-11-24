const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')
const auth = require('../auth')

router.put('/editAccount/:id', auth.verify, UserController.editUserAccount)


module.exports = router