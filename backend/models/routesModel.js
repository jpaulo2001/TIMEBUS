const mongoose = require('mongoose')
const Schema = mongoose.Schema


const routesSchema = new Schema({
  routeNumber: {
    type: String,
    required: true,
  },
  stops: {
    type: Array,
    required: true,
  }
}, { timestamps: true });


module.exports = mongoose.model('busroutes', routesSchema)


