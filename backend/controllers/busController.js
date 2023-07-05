const Bus = require('../models/busesModel')

// get all buses
const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
    res.status(200).json(buses)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Buses' });
  }
};

// get a single bus
const getBusName = async (req, res) => {
  try {
    const { busName } = req.params;
    const bus = await Bus.find({ busName: busName });
    res.status(200).json(bus);
  } catch (err) {
    return res.status(404).json({ err: 'No such Bus' });
  }
};

//create a bus
const createBus = async (req, res) => {
  try {
    const { busName, busRoute, capacity, isAvailable } = req.body;
    const newBus = await Bus.create({ busName, busRoute, capacity, isAvailable });
    console.log(req.body);

    res.status(201).json(newBus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Bus' });
  }
};

//update bus
const updateBus = async (req, res) => {
  try {
    const { _id } = req.params;
    const { busName, busRoute, capacity, isAvailable } = req.body;
    console.log(req.body);

    const updatedBus = await Bus.findByIdAndUpdate(
      _id,
      { busName, busRoute, capacity, isAvailable },
      { new: true }
    );
    if (updatedBus) {
      res.status(200).json(updatedBus);
    } else {
      res.status(404).json({ error: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Bus' });
  }
};

//delete bus
const deleteBus = async (req, res) => {
  try{
    const {_id} = req.params;
    const deletedBus = await Bus.findByIdAndRemove(_id);
    if(deletedBus) {
      res.status(200).json({message: 'Bus deleted successfully'});
    }else{
      res.status(404).json({error: 'Bus not found'});
    }
  }catch(error){
    res.status(500).json({error: 'Failed to delete Bus'});
  }
};

//export functions
module.exports = {
  getBuses,
  getBusName,
  createBus,
  updateBus,
  deleteBus
}