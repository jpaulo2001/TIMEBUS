const User = require('../models/user.model');
const createError =  require("../utils/createError.js");
const bcrypt =  require("bcrypt");
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save(); 
    res.status(201).send("User has been created.");
  } catch (err) {
    console.log(err);
    next(err);
  }
};



const login = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    console.log(req.body.email);
    if (!existingUser) {
      return next(createError(404, "User not found!"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, existingUser.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = existingUser._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    console.log(err);
    next(err);
  }
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
  logout
}