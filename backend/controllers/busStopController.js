const stops = require('../models/busStopModel')
const mongoose = require('mongoose')

// get all routes
const getStops = async (req, res) => {
  const stops = await stops.find({}).sort({createdAt: -1})
  res.status(200).json(stops)
}

// get a single route
const getStop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such stop'})
  }

  const stop = await stops.findById(id)

  if (!routes) {
    return res.status(404).json({error: 'No such stop'})
  }

  res.status(200).json(stop)
}