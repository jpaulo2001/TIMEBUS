require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')




//express app in a variable
const app = express()


//middleware
app.use(express.json()) //check is theres some data coming
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () =>{
            console.log("Connected to db", process.env.PORT)
        })
    })
    .catch((Error) => {
        console.log(Error)
    })



