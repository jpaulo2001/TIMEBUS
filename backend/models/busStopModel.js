const mongoose = require('mongoose');
const { Schema } = mongoose;

const busStopSchema = new Schema({
  stopName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
