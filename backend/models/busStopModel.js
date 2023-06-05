const mongoose = require('mongoose');
const { Schema } = mongoose;

const busStopSchema = new Schema({
  stopName: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
