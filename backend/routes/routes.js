const express = require('express')
const {
    getRoutes,
    getRouteNumber, 
    createRoute,
    updateRoute,
    deleteRoute,
    getRoutesWStopsAB
} = require('../controllers/routesController')

const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate,getRoutes)
router.get('/:routeNumber', authenticate,getRouteNumber)
router.post('/search',authenticate,getRoutesWStopsAB)

//Admin
router.post('/', authenticate,createRoute)
router.put('/:_id', authenticate,updateRoute);
router.delete('/:_id', authenticate,deleteRoute);

module.exports = router