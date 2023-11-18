const express = require('express')
const GraphicsController = require('../controllers/graphics-controller')
const router = express.Router()
//const auth = require('../auth')

//router.post('/map', auth.verify, MapController.createMap)
router.post('/graphics', GraphicsController.createGraphics)
//router.put('/map/:id', auth.verify, MapController.updateMapById)
router.put('/graphics/:id', GraphicsController.updateGraphicsById)
//router.get('/map/:id', auth.verify, MapController.getMapById)
router.get('/graphics/:id', GraphicsController.getGraphicsById)
//router.delete('/map/:id', auth.verify, MapController.deleteMap)
router.delete('/graphics/:id', GraphicsController.deleteGraphics)

module.exports = router