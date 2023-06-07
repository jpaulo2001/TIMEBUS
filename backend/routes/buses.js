const express = require('express')
const {
  getBuses,
  getBusName,
  createBus,
  updateBus,
  deleteBus
} = require('../controllers/busController')

const router = express.Router()


router.get('/', getBuses)
router.get('/:busName', getBusName)

// Admin
router.post('/', createBus);
router.put('/:_id', updateBus);
router.delete('/:_id', deleteBus);


module.exports = router