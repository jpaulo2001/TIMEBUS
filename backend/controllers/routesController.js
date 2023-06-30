const Routes = require('../models/routesModel')
const mongoose = require('mongoose')


//get all routes
const getRoutes = async (req, res) => {
  try {
    const routes = await Routes.find()
    res.status(200).json(routes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Routes' });
  }
};

const getRoutesWStopsAB = async (req, res) => {
  const { stopA, stopB } = req.body;

  try {
    const routes = await Routes.find({
      stops: {
        $all: [stopA, stopB]
      }
    });
    console.log(routes)
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Routes' });
  }
};


//get a single route
const getRouteNumber = async (req, res) => {
  const { routeNumber } = req.params

  const route = await Routes.findOne({ routeNumber: routeNumber });

  if (!route) {
    return res.status(404).json({ error: 'No such route' });
  }
  res.status(200).json(route);
};


// create a new Route
const createRoute = async (req, res) => {
  try {
    console.log(req.body);
    const { routeNumber, stops } = req.body;
    const newRoute = await Routes.create({ routeNumber, stops });
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a bus stop' });
  }
}

//update route
const updateRoute = async (req, res) => {
  try {
    const { _id } = req.params
    const { routeNumber, stops } = req.body;
    console.log(req.body);

    const updatedRoute = await Routes.findByIdAndUpdate(
      _id,
      { routeNumber, stops },
      { new: true }
    );
    if (updatedRoute) {
      res.status(200).json(updatedRoute);
    } else {
      res.status(404).json({ erro: 'Route not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the route' })
  }
};


//delete route
const deleteRoute = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedRoute = await Routes.findByIdAndRemove(_id);
    if (deletedRoute) {
      res.status(200).json({ message: 'Route deleted successfully' });
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete route' });
  }
};

module.exports = {
  getRoutes,
  getRouteNumber,
  createRoute,
  updateRoute,
  deleteRoute,
  getRoutesWStopsAB
}