const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')
const auth = require('../auth')

// ADD auth.verify
router.put('/editAccount/:id', UserController.editUserAccount)


module.exports = router