const express = require('express')
const {
  getschedules,
  getschedule,
  createschedules,
  updateschedules,
  deleteschedules
} = require('../controllers/schedulesController')

const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate,getschedules)
router.get('/:busName', authenticate,getschedule)

// Admin
router.post('/', authenticate,createschedules);
router.put('/:_id', authenticate,updateschedules);
router.delete('/:_id', authenticate,deleteschedules);


module.exports = router