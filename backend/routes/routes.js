const express = require('express')
const {
  getRoute,
  getRoutes
} = require('../controllers/routesController')

const router = express.Router()

// GET all workouts
router.get('/', getRoutes)

// GET a single workout
router.get('/:id', getRoute)

module.exports = router