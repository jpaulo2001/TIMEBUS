const Routes = require('../models/routesModel')
const mongoose = require('mongoose')

// get all routes
const getRoutes = async (req, res) => {
  try{
    const routes = await Routes.find()
    res.status(200).json(routes)
  } catch(error){
    res.status(500).json({ error: 'Failed to find Routes' });
  }
};

// get a single route
const getRoute = async (req, res) => {
  const { ID } = req.params

  const route = await Routes.findOne({ ID:ID });

  if (!route) {
    return res.status(404).json({ error: 'No such route' });
  }
  res.status(200).json(route);
}


// fix para novo modulo
/*
// create a new routes
const createRoutes = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const routes = await routes.create({ title, load, reps })
    res.status(200).json(routes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
*/


// delete a routes
const deleteRoutes = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such routes'})
  }

  const routes = await routes.findOneAndDelete({_id: id})

  if(!routes) {
    return res.status(400).json({error: 'No such routes'})
  }

  res.status(200).json(routes)
}



// update a routes
const updateRoutes = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such routes'})
  }

  const routes = await routes.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!routes) {
    return res.status(400).json({error: 'No such routes'})
  }

  res.status(200).json(routes)
}

module.exports = {
  getRoutes,
  getRoute,
  
  deleteRoutes,
  updateRoutes
}