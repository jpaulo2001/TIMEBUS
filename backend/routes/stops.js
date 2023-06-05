const express = require('express')
const {
  getStopByName,
  getStops,
} = require('../controllers/busStopController.js')

const router = express.Router()

router.get('/:stopName', getStopByName);
router.get('/', getStops);

module.exports = router