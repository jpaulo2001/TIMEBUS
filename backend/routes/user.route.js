const express = require("express");
const { getUsers, getUser, createUser, updateUser, deleteUser  } = require("../controllers/user.controller.js");
const { verifyToken } = require("../middleware/jwt.js");

const router = express.Router();

router.get('/', getUsers)
router.get("/:id", getUser);

// Admin
router.post('/', createUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);


module.exports = router;