const express = require('express')
const {
  getStops,
  getStopByName,
  createStop,
  updateStop,
  deleteStop
} = require('../controllers/busStopController.js')

const { verifyToken } = require('../middleware/jwt');

const router = express.Router()

router.get('/', getStops);
router.get('/:stopName', getStopByName);

// Admin
router.post('/', createStop);
router.put('/:_id', updateStop);
router.delete('/:_id', deleteStop);


module.exports = router