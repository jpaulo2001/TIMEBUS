const express = require('express')
const {
  
  getStops,
  getStopByName
  
} = require('../controllers/busStopController.js')

const router = express.Router()

router.get('/', getStops);
router.get('/:stopName', getStopByName)

// router.put('/:id', updateStop);
// router.delete('/:id', deleteStop);

module.exports = router