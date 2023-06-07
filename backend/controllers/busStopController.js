const BusStop = require('../models/busStopModel')
const createError = require('../utils/createError');


// get all routes
const getStops = async (req, res) => {
  try {
    const stops = await BusStop.find();
    res.status(200).json(stops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find stops' });
  }
};

const getStopByName = async (req, res) => {
  const { stopName } = req.params;

  const stop = await BusStop.find({stopName: stopName});

  if (!stop) {
    return res.status(404).json({ error: 'No such stop' });
  }

  res.status(200).json(stop);
};

const createStop = async (req, res) => {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Only admin users can create stops' });
    // }

    console.log(req.body);
    const { stopName, lat, lng } = req.body;
    const newStop = await BusStop.create({ stopName, lat, lng });
    res.status(201).json(newStop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a bus stop' });
  }
};

const updateStop = async (req, res) => {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Only admin users can update stops' });
    // }

    const { _id } = req.params;
    const { stopName, lat, lng } = req.body;
    console.log(req.body);
    
    const updatedStop = await BusStop.findByIdAndUpdate(
      _id,
      { stopName, lat, lng },
      { new: true }
    );
    if (updatedStop) {
      res.status(200).json(updatedStop);
    } else {
      res.status(404).json({ error: 'Bus stop not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the bus stop' });
  }
};

const deleteStop = async (req, res) => {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Only admin users can delete stops' });
    // }
    
    const { _id } = req.params;
    const deletedStop = await BusStop.findByIdAndDelete(_id);
    if (deletedStop) {
      res.status(200).json({ message: 'Bus stop deleted successfully' });
    } else {
      res.status(404).json({ error: 'Bus stop not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the bus stop' });
  }
};


module.exports = {
  getStops,
  getStopByName,
  createStop,
  updateStop,
  deleteStop
}