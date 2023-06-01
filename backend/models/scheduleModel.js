const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  route_id: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  bus_number: {
    type: String,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

/*
Schedules:

_id: Unique identifier for the schedule
route_id: Reference to the associated route
bus_number: Number or identifier of the bus operating the schedule
departure_time: Departure time of the bus
arrival_time: Arrival time at the destination
fare: Fare or ticket price for the schedule
*/