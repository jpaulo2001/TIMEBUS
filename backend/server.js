require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')





//express app in a variable
const app = express()


//middleware
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)

// listen for request
app.listen(process.env.PORT, () =>{
    console.log("Listening on Porte", process.env.PORT)
})

