const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
Buses: 
{ 
  "_id": ObjectId("..."), 
  "gpslocation": "gpslocation gps x,y,z", 
  "capacity": 50, 

*/


const busSchema = new Schema({
  busName: {
    type: String,
    required: true,
  },
  busRoute: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

const Bus = mongoose.model('Bus', busSchema)

module.exports = Bus