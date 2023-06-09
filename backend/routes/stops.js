const express = require('express')
const {
  getStops,
  getStopByName,
  createStop,
  updateStop,
  deleteStop
} = require('../controllers/busStopController.js')

const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate,getStops);
router.get('/:stopName', authenticate,getStopByName);


// Admin
router.post('/', authenticate,createStop);
router.put('/:_id', authenticate,updateStop);
router.delete('/:_id', authenticate,deleteStop);


module.exports = router