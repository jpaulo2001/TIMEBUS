const BusStop = require('../models/busStopModel')


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

  const stop = await BusStop.findOne({ stopName: stopName });

  if (!stop) {
    return res.status(404).json({ error: 'No such stop' });
  }

  res.status(200).json(stop);
};



module.exports = {
  getStops,
  getStopByName
}