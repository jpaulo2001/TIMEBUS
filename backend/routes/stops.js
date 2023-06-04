const express = require('express')
const {
  getStop,
  getStops,
  searchBuses,
  searchStops,
  updateStop,
  deleteStop
} = require('../controllers/busStopController.js')

const router = express.Router()

router.get('/:id', getStop);
router.get('/', getStops);
router.get('/search/:name?', searchStops)
// router.get('/search/:name', searchBuses)
// router.get('/search/:name', searchStops);
router.put('/:id', updateStop);
router.delete('/:id', deleteStop);

module.exports = router