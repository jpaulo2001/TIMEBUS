const BusStop = require('../models/busStopModel')
const mongoose = require('mongoose')
const Bus = require('../models/busModel');


// get all routes
const getStops = async (req, res) => {
  // const stops = await stops.find({}).sort({createdAt: -1})
  // res.status(200).json(stops)
  try {
    const stops = await BusStop.find();
    res.status(200).json(stops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find stops' });
  }
};

// get a single route
const getStop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such stop' })
  }

  const stop = await BusStop.findById(id);

  if (!routes) {
    return res.status(404).json({ error: 'No such stop' })
  }

  res.status(200).json(stop)
};

const searchStops = async (req, res) => {
  const { name } = req.params;

  try {
    // Search for stops with a case-insensitive match to the name
    const matchingStops = await BusStop.find({ name: { $regex: new RegExp(name, 'i') } });

    res.status(200).json(matchingStops);
  } catch (error) {
    console.error('Error searching for stops:', error);
    res.status(500).json({ error: 'An error occurred while searching for stops' });
  }
};


const searchBuses = async (req, res) => {
  const { name } = req.params;

  try {
    // Find buses with a case-insensitive match to the name
    const matchingBuses = await Bus.find({ name });

    res.status(200).json(matchingBuses);
  } catch (error) {
    console.error('Error searching for buses:', error);
    res.status(500).json({ error: 'An error occurred while searching for buses' });
  }
};

const updateStop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such stop' });
    }

    const updatedStop = await BusStop.findByIdAndUpdate(
      id,
      { name, latitude, longitude },
      { new: true }
    );

    if (!updatedStop) {
      return res.status(404).json({ error: 'No such stop' });
    }

    res.status(200).json(updatedStop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stop' });
  }
};

const deleteStop = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such stop' });
    }

    const deletedStop = await BusStop.findByIdAndDelete(id);

    if (!deletedStop) {
      return res.status(404).json({ error: 'No such stop' });
    }

    res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete stop' });
  }
};



module.exports = {
  getStops,
  getStop,
  searchBuses,
  searchStops,
  updateStop,
  deleteStop
}