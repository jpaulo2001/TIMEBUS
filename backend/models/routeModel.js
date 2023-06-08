const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  ID: String,
  stops: [String], // List of stops
  schedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }]
});

const Route = mongoose.model('busRoute', RouteSchema);

module.exports = Route;