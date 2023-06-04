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
<<<<<<< HEAD
router.get('/search/:name?', searchStops)
// router.get('/search/:name', searchBuses)
// router.get('/search/:name', searchStops);
=======
router.get('/buses/search/:name', searchBuses)
router.get('/search/:name', searchStops);
>>>>>>> 640964da89962ed333ecc237dff4a3006c2093ba
router.put('/:id', updateStop);
router.delete('/:id', deleteStop);

module.exports = router