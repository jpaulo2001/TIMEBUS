const express = require('express')
const {getRoutes,getRoute, createRoutes, deleteRoutes, updateRoutes
} = require('../controllers/routesController')





const router = express.Router()
// GET all routes
router.get('/', getRoutes)

// GET a single route
router.get('/:id', getRoute)

// POST a new route
router.post('/', createRoutes)

// DELETE a route
router.delete('/:id', deleteRoutes)

// UPDATE a route
router.patch('/:id', updateRoutes)

module.exports = router