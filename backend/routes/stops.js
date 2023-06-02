const express = require('express')
const {
  getStop,
  getStops
} = require('../controllers/busStopController.js')

const router = express.Router()

// GET all workouts
router.get('/', getStop)

// GET a single workout
router.get('/:id', getStops)

module.exports = router