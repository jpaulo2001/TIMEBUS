const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  name: String,
  stops: [String], // List of stops
  schedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }]
});

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;