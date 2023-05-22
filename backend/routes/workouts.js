const express = require('express')
const Workout = require('../models/workoutModel')

const router = express.Router()

//get all the workouts 
router.get('/', (req, res)=>{
    res.json({msg: 'get all workouts'})
})


//get a single workout
router.get('/:id', (req,res) => {
    res.json({msg:'get a single workout'})
})

//post a new workout
router.post('/', async (req,res) => {
    const {title,load,reps} = req.body // extract the data
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }
    catch(Error){
        res.status(400).json({error: error.message})
    }
})


//delete a workout
router.delete('/:id', (req,res) => {
    res.json({msg:'delete a  workout'})
})


//update a  workout
router.patch('/:id', (req,res) => {
    res.json({msg:'update a workout'})
})




module.exports = router
