const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  passenger: {
    type: Schema.Types.ObjectId,
    ref: 'Passenger',
    default: null,
  },
});

const busSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  number: {
    type: String,
    required: true,
  },
  seats: [seatSchema],
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;