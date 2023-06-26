const express = require('express')
const router = express.Router()

const { getContacts, createContact, deleteContact } = require('../controllers/contactController');
const authenticate = require('../middleware/authenticate')


router.get('/', authenticate, getContacts);
router.post('/', authenticate, createContact);
router.delete('/:name', authenticate, deleteContact);

module.exports = router