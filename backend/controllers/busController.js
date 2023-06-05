const Buses = require('../models/busesModel')
const mongoose = require('mongoose')

// get all buses
const getBuses = async (req, res) => {
  try{
    const buses = await Buses.find()
    res.status(200).json(Buses)
  } catch(error){
    res.status(500).json({ error: 'Failed to find Buses' });
  }
};

// get a single bus
const getBus = async (req, res) => {
  const { ID } = req.params

  const bus = await Buses.findOne({ name: name });

  if (!bus) {
    return res.status(404).json({ error: 'No such Bus' });
  }
  res.status(200).json(bus);
}

module.exports = {
    getBuses,
    getBus,
}