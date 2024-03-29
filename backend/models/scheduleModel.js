const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  scheduleID: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  stopName: {
    type: String,
    required: true,
  },
  departureTimes: [{
    type: String,
    required: true,
  }],
},{
  timestamps:true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
