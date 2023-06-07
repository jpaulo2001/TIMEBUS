const express =  require("express");
const { 
    getUsers,
    register, 
    login, 
    logout } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router;
