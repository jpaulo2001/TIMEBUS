const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }
    let user = new User({
      name: req.body.name,
      password: hashedPass,
      email: req.body.email,
      phone: req.body.phone,
    })
    user.save().then(user => {
      res.json({
        message: 'User added successfully!'
      })
    })
      .catch(error => {
        res.json({
          message: 'An error occured!',
        })
      })
  })
};

const login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ $or: [{ email: username }, { name: username }] }).then(user => {
    console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({ error: err })
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, 'private key :) I hope no one knows me')

          // Create a user object to send, without the password
          let userResponse = {
            name: user.name,
            email: user.email,
          }

          return res.json({
            message: 'Login Successful!',
            token: token,
            user: userResponse,
          })
        }
        else {
          return res.status(401).json({ message: 'Password not matched!' })
        }
      })
    } else {
      return res.status(404).json({ message: 'No user found!' })
    }
  })
};

const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

module.exports = {
  register,
  login,
  logout,
}