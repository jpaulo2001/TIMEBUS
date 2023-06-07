const express = require('express')

const {
  getschedules,
  getschedule,
  createschedules,
  updateschedules,
  deleteschedules
} = require('../controllers/schedulesController')

const router = express.Router()


router.get('/', getschedules)
router.get('/:busName', getschedule)

// Admin
router.post('/', createschedules);
router.put('/:_id', updateschedules);
router.delete('/:_id', deleteschedules);


module.exports = router