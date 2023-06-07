const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const busSchema = new Schema({
  busName: {
    type: String,
    required: true,
  },
  busRoute: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

const Bus = mongoose.model('Bus', busSchema)

module.exports = Bus