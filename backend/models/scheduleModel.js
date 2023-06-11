const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
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
    type: Date,
    required: true,
  }],
},{
  timestamps:true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
