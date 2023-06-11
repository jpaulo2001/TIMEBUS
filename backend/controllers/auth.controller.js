const User = require('../models/user.model');
const createError =  require("../utils/createError.js");
const bcrypt =  require("bcrypt");
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const register = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hashedPass){
    if(err){
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
    user.save().then(user=>{
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

  User.findOne({$or: [{email:username},{name:username}]}).then(user => {
    console.log(user)
    if(user){
      bcrypt.compare(password, user.password, function(err, result){
        if(err) {res.json({error: err})}
        if(result){
          let token = jwt.sign({name: user.name}, 'private key :) I hope no one knows me')
          res.json({
            message: 'Login Successful!',
            token: token,
          })
        }
        else{res.json({message: 'Password not matched!'})}
      })
    }else{res.json({message: 'No user found!'})}
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