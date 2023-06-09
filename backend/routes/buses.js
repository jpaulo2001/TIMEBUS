const express = require('express')
const {
  getBuses,
  getBusName,
  createBus,
  updateBus,
  deleteBus
} = require('../controllers/busController')

const router = express.Router()
const authenticate = require('../middleware/authenticate')



router.get('/', authenticate,getBuses)
router.get('/:busName', authenticate,getBusName)

// Admin
router.post('/', authenticate, createBus);
router.put('/:_id', authenticate,updateBus);
router.delete('/:_id', authenticate,deleteBus);


module.exports = router