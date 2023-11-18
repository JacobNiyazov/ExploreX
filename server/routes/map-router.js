const express = require('express')
const MapController = require('../controllers/map-controller')
const router = express.Router()
//const auth = require('../auth')

//router.post('/map', auth.verify, MapController.createMap)
router.post('/map', MapController.createMap)
//router.put('/map/:id', auth.verify, MapController.updateMapById)
router.put('/map/:id', MapController.updateMapById)
//router.get('/map/:id', auth.verify, MapController.getMapById)
router.get('/map/:id', MapController.getMapById)
//router.get('/usermapidpairs', auth.verify, MapController.getUserMapIdPairs)
router.get('/usermapidpairs', MapController.getUserMapIdPairs)
//router.delete('/map/:id', auth.verify, MapController.deleteMap)
router.delete('/map/:id', MapController.deleteMap)
router.get('/publicmapidpairs', MapController.getPublicMapIdPairs)

module.exports = router