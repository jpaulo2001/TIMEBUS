const express = require('express')
const {
  getBuses,
  getBus
} = require('../controllers/busController')

const router = express.Router()

// GET all workouts
router.get('/', getBuses)

// GET a single workout
router.get('/:name', getBuses)

// // POST a new workout
// router.post('/', createWorkout)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router