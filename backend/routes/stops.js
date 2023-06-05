const express = require('express')
const {
  
  getStops,
  getStopByName
  
} = require('../controllers/busStopController.js')

const router = express.Router()

router.get('/', getStops);
router.get('/:stopName', getStopByName)

module.exports = router