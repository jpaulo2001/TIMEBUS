const express = require('express')
const {
  getStopByName,
  getStops,
  searchBuses,
  searchStops,
  updateStop,
  deleteStop
} = require('../controllers/busStopController.js')

const router = express.Router()

router.get('/', getStops);

// router.get('/buses/:id', searchBuses)
// router.put('/:id', updateStop);
// router.delete('/:id', deleteStop);

module.exports = router