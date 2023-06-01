const route = require('../models/routeModel')
const mongoose = require('mongose')

const getRoutes = async(req, res) => {
    res.status(200).json(await routes.find({}).sort({createdAt: -1}))
}

const getRoute = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such Route'})}
  
    const workout = await route.findById(id)
  
    if (!workout) {
      return res.status(404).json({error: 'No such Route'})}

    res.status(200).json(route)
  }

  module.exports = {
    getRoutes,
    getRoute
  }