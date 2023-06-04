require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const busesRoutes = require('./routes/buses')
const stopRoutes = require('./routes/stops')
const cors = require('cors');

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// routes
app.use('/api/buses', busesRoutes)
app.use('/api/stops', stopRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => { 
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })