const schedules = require('../models/scheduleModel')
const mongoose = require('mongoose')


//get all schedules
const getschedules = async (req, res) => {
  try {
    const _id = await schedules.find()
    res.status(200).json(_id)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find schedules' });
  }
};


// get a single schedule
const getschedule = async (req, res) => {
    try {
      const { _id } = req.params;
      const schedule = await Bus.find({ _id: _id });
      res.status(200).json(schedule);
    } catch (err) {
      return res.status(404).json({ err: 'No such schedule' });
    }
}

// create a new schedules
const createschedules = async (req, res) => {
  try {
    console.log(req.body);
    const { busName, stopName, departureTimes } = req.body;
    const newSchedules = await schedules.create({ busName, stopName, departureTimes });
    res.status(201).json(newSchedules);
  } catch (error) {
    console.error("Error creating schedule: ", error);
    res.status(500).json({ error: 'Failed to create a schedule' });
  }
}


//upate schedules
const updateschedules = async (req, res) => {
  try {
    const { _id } = req.params;
    const { busName, stopName, departureTimes } = req.body;
    console.log(req.body);

    const updatedSchedules = await schedules.findByIdAndUpdate(
      _id,
      { busName, stopName, departureTimes },
      { new: true }
    );

    if (updatedSchedules) {
      res.status(200).json(updatedSchedules);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the schedule' });
  }
};

//delete schedules
const deleteschedules = async (req, res) => {
  try {
    const { stopName } = req.params;
    const deletedSchedule = await schedules.findOneAndDelete({ stopName: stopName });

    if (deletedSchedule) {
      res.status(200).json({ message: 'Schedule deleted successfully' });
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
};



module.exports = {
  getschedules,
  getschedule,
  createschedules,
  updateschedules,
  deleteschedules
};