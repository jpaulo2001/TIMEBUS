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
    const { _id, route_id, bus_number, departure_time, arrival_time } = req.body;
    const newschedules = await schedules.create({ _id, route_id, bus_number, departure_time, arrival_time });
    res.status(201).json(newschedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a bus stop' });
  }
}


//upate schedules
const updateschedules = async (req, res) => {
  try {
    const { _id } = req.params
    const { route_id, bus_number, departure_time, arrival_time } = req.body;
    console.log(req.body);

    const updatedschedules = await schedules.findByIdAndUpdate(
      _id,
      { route_id, bus_number, departure_time, arrival_time },
      { new: true }
    );
    if (updatedschedules) {
      res.status(200).json(updatedschedules);
    } else {
      res.status(404).json({ erro: 'schedules not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the schedules' })
  }
};


//delete schedules
const deleteschedules = async (req, res) => {
  try {
    const { _id } = req.params
    const deletedschedules = await schedules.findByIdAndDelete(_id);
    if (deletedschedules) {
      res.status(200).json({ message: 'schedules deleted successfully' })
    } else {
      res.status(404).json({ error: 'schedules not found' });
    }
  }catch(error){
    res.status(500).json({error:'Failed to delete schedules'});
  }
};


module.exports = {
  getschedules,
  getschedule,
  createschedules,
  updateschedules,
  deleteschedules
};