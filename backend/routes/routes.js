const express = require('express')
const {
    getRoutes,
    getRouteNumber, 
    createRoute,
    updateRoute,
    deleteRoute   
} = require('../controllers/routesController')

const router = express.Router()

router.get('/', getRoutes)
router.get('/:routeNumber', getRouteNumber)

//Admin
router.post('/', createRoute)
router.put('/:_id', updateRoute);
router.delete('/:_id', deleteRoute);

module.exports = router