const express = require('express')
const MapController = require('../controllers/map-controller')
const router = express.Router()
const auth = require('../auth')
const multer = require('multer')
var path = require('path')

var storage = multer.memoryStorage({});
const upload = multer({ storage: storage })


//router.post('/map', auth.verify, MapController.createMap)
router.post('/map', auth.verify, upload.array('file', 2), MapController.createMap)
router.post('/map/:id', auth.verify, MapController.forkMap)
//router.put('/map/:id', auth.verify, MapController.updateMapById)
router.put('/map/:id', auth.verify, MapController.updateMapById)
//router.get('/map/:id', auth.verify, MapController.getMapById)
router.get('/map/:id', MapController.getMapById)
//router.get('/usermapidpairs', auth.verify, MapController.getUserMapIdPairs)
router.get('/usermapidpairs', auth.verify, MapController.getUserMapIdPairs)
//router.delete('/map/:id', auth.verify, MapController.deleteMap)
router.delete('/map/:id', auth.verify, MapController.deleteMap)
router.get('/publicmapidpairs', MapController.getPublicMapIdPairs)

module.exports = router