const express = require('express')
const {
  getBuses,
  getBusName
} = require('../controllers/busController')

const router = express.Router()


router.get('/', getBuses)
router.get('/:busName', getBusName)


module.exports = router