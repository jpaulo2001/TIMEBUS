const busSchema = require('../models/busesModel')
const mongoose = require('mongoose')

// get all buses
const getBuses = async (req, res) => {
  try {
    const buses = await busSchema.find()
    res.status(200).json(buses)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Buses' });
  }
};

// get a single bus
const getBusName = async (req, res) => {
  try {

    let busName = req.params.busName;
    busName = busName.trim().toLowerCase();

    console.log(`Received name: ${busName}`);  // This will log the received bus name to the console
    const bus = await busSchema.findOne({ busName: busName });
    res.status(200).json(bus);
  } catch (err) {
    return res.status(404).json({ err: 'No such Bus' });
  }
}

module.exports = {
  getBuses,
  getBusName,
}