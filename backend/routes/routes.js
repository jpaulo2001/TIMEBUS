const express = require('express')
const {
    getRoutes,
    getRoute, 
    deleteRoutes, 
    updateRoutes
} = require('../controllers/routesController')

const router = express.Router()

router.get('/', getRoutes)
router.get('/:ID', getRoute)

// // // POST a new route
// // router.post('/', createRoutes)

// // DELETE a route
// router.delete('/:id', deleteRoutes)

// // UPDATE a route
// router.patch('/:id', updateRoutes)

module.exports = router