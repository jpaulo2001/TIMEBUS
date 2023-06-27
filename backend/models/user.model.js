const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique:true,
  }

},{
  timestamps:true,
});

module.exports = mongoose.model("User", userSchema)